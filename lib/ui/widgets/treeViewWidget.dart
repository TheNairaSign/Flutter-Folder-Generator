import 'package:animated_tree_view/tree_view/tree_node.dart';
import 'package:animated_tree_view/tree_view/tree_view.dart';
import 'package:auto_generate_file/providers/folderProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class TreeViewWidget extends StatelessWidget {
  const TreeViewWidget({super.key, required this.searchText});
  final String searchText;

  @override
  Widget build(BuildContext context) {
    final folderProvider = context.read<FolderProvider>();
    return  TreeView.simple(
        showRootNode: true,
        tree: folderProvider.rootNode!,
      // controller: provider.treeController,
      builder: (context, data) {  // Use TreeViewData instead
        final node = data;  // Access the TreeNode directly
        final bool isFolder = data.children.isNotEmpty;  // Check if it has children
        
        // Skip if searching and doesn't match
        if (searchText.isNotEmpty && 
            !node.toString().toLowerCase().contains(searchText.toLowerCase())) {
          return const SizedBox.shrink();
        }
        
        return InkWell(
          onTap: () {
            if (isFolder) {
              data.expansionNotifier.value = !data.isExpanded;
            }
          },
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
            child: Row(
              children: [
                TweenAnimationBuilder<double>(
                  tween: Tween<double>(begin: 0.0, end: 1.0),
                  duration: const Duration(milliseconds: 300),
                  builder: (context, value, child) {
                    return Transform.scale(
                      scale: value,
                      child: child,
                    );
                  },
                  child: Icon(
                    isFolder
                        ? data.isExpanded
                            ? Icons.folder_open
                            : Icons.folder
                        : Icons.insert_drive_file,
                    color: isFolder ? Colors.amber : Colors.blue,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    node.toString(),  // Convert node to string
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: isFolder ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
                ),
                if (isFolder)
                  AnimatedRotation(
                    turns: data.isExpanded ? 0.25 : 0,
                    duration: const Duration(milliseconds: 300),
                    child: IconButton(
                      icon: const Icon(
                        Icons.keyboard_arrow_right,
                        size: 16,
                      ),
                      onPressed: () {},
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}