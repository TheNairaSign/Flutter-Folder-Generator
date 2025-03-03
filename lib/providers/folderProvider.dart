import 'dart:io';

import 'package:animated_tree_view/animated_tree_view.dart';
import 'package:animated_tree_view/tree_view/tree_view_state_helper.dart';
import 'package:archive/archive.dart';
import 'package:auto_generate_file/models/models.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

class FolderProvider extends ChangeNotifier {
  TreeNode<String>? _rootNode;
  TreeNode<String>? get rootNode => _rootNode;
  TreeViewController? _treeController;
  TreeViewController? get treeController => _treeController;
  
  final Map<String, dynamic> _expandedNodes = {};

  void generateFolderStructure(
    String projectName, 
    String architecture, 
    List<String> extraFolders, 
    {bool includeTemplateFiles = true}
  ) {

    const Animation<double> animation =  AlwaysStoppedAnimation(1.0);
    final g = GlobalKey<AnimatedListState>();
    ListState<ITreeNode<String>> lisState = TreeViewState(animation);

    // Create a root node with the project name
    _rootNode = TreeNode<String>(key: projectName);

    final animatedListController = AnimatedListStateController<String>(
      listState: lisState, // ✅ Correctly assigned listState
      showRootNode: true,
      tree: _rootNode!,
  );
    
    // Initialize the tree controller with the root node
    _treeController = TreeViewController<String, TreeNode<String>>(
      TreeViewStateHelper(
        animatedListStateController: animatedListController,
        expansionBehaviourController: TreeViewExpansionBehaviourController<String>(
          scrollController: AutoScrollController(),
          expansionBehavior: ExpansionBehavior.collapseOthers,
          animatedListStateController: animatedListController,
        ),
        tree: _rootNode!,
      )
    );

    // Get the list of folders for the selected architecture
    List<String> baseFolders = Models.architectureTemplates[architecture] ?? [];
    
    // Process each folder path
    for (String folderPath in baseFolders) {
      _addFolderPath(_rootNode!, folderPath, includeTemplateFiles);
    }

    // Add extra folders
    for (String folderPath in extraFolders) {
      // Make sure extra folders are properly formatted
      String normalizedPath = folderPath.startsWith('lib/') 
          ? folderPath 
          : 'lib/${folderPath.trim()}';
      _addFolderPath(_rootNode!, normalizedPath, includeTemplateFiles);
    }

    // Add pubspec.yaml file
    // TreeNode<String> pubspecNode = TreeNode<String>(key: 'pubspec.yaml');
    // _rootNode!.add(pubspecNode);
    
    // // Add README.md file
    // TreeNode<String> readmeNode = TreeNode<String>(key: 'README.md');
    // _rootNode!.add(readmeNode);

    notifyListeners();
  }

  void _addFolderPath(TreeNode<String> parentNode, String path, bool includeTemplateFiles) {
    List<String> parts = path.split('/');
    TreeNode<String> currentNode = parentNode;

    for (int i = 0; i < parts.length; i++) {
      String part = parts[i];
      bool isLastPart = i == parts.length - 1;
      
      // Check if this node already exists
      TreeNode<String>? existingNode;
      
      // Find if a child with this key already exists
      for (var child in currentNode.children.values) {
        if (child.key == part) {
          existingNode = child as TreeNode<String>;
          break;
        }
      }
      
      if (existingNode == null) {
        // Create a new node
        TreeNode<String> newNode = TreeNode<String>(key: part);
        currentNode.add(newNode);
        currentNode = newNode;
      } else {
        currentNode = existingNode;
      }
      
      // If this is the last part and we should include template files
      if (isLastPart && includeTemplateFiles) {
        // Check if we have template files for this folder
        String? templateFile = Models.templateFiles[path];
        if (templateFile != null) {
          TreeNode<String> fileNode = TreeNode<String>(key: templateFile);
          currentNode.add(fileNode);
        }
      }
    }
  }

  TreeNode<String>? findNodeByPath(String path) {
    if (_rootNode == null) return null;
    
    List<String> parts = path.split('/');
    TreeNode<String> currentNode = _rootNode!;
    
    // Skip the first part if it's the root node's key
    int startIndex = parts.isNotEmpty && parts[0] == _rootNode!.key ? 1 : 0;
    
    for (int i = startIndex; i < parts.length; i++) {
      String part = parts[i];
      bool found = false;
      
      for (var child in currentNode.children.values) {
        if (child.key == part) {
          currentNode = child as TreeNode<String>;
          found = true;
          break;
        }
      }
      
      if (!found) return null;
    }
    
    return currentNode;
  }

  Future<String> zipAndShare() async {
    if (_rootNode == null) return '';
    
    final String projectName = _rootNode!.key;
    final Archive archive = Archive();
    
    void addFiles(Archive archive, TreeNode<String> node, String basePath) {
      String nodePath = basePath.isEmpty ? node.key : "$basePath/${node.key}";
      
      // If this is a file node (has no children), add file content
      if (node.children.isEmpty) {
        // For now, just add empty file content
        archive.addFile(ArchiveFile(nodePath, 0, []));
      } else {
        // This is a directory, add it as a directory entry
        archive.addFile(ArchiveFile("$nodePath/", 0, []));
        
        // Then process all children
        for (var child in node.children.values) {
          addFiles(archive, child as TreeNode<String>, nodePath);
        }
      }
    }
    
    // Start with the root node
    addFiles(archive, _rootNode!, '');
    
    // Encode the Archive into ZIP format
    final zipData = ZipEncoder().encode(archive);
    
    // Get a temp directory to store the zip file
    final tempDir = await getTemporaryDirectory();
    final String zipFilePath = '${tempDir.path}/$projectName.zip';
    
    // Write the zip file
    final zipFile = File(zipFilePath)..writeAsBytesSync(zipData);
    
    return zipFile.path;
  }
}