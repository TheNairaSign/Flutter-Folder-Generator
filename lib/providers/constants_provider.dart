import 'dart:convert';

import 'package:auto_generate_file/providers/folderProvider.dart';
import 'package:auto_generate_file/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class ConstantsProvider extends ChangeNotifier {

  final TextEditingController _projectNameController = TextEditingController();
  final TextEditingController _foldersController = TextEditingController();
  final TextEditingController _searchController = TextEditingController();

  String? _selectedArchitecture;
  String? _selectedScale;
  bool _showAdvancedOptions = false;
  bool _includeTemplateFiles = true;
  String _searchText = '';
  bool _isGenerating = false;

  // Animation controllers
  late AnimationController _rotationController;
  late AnimationController _scaleController;
  late AnimationController _bounceController;

  final List<String> scales = ['Small', 'Medium', 'Large'];
  final Map<String, List<String>> architectureOptions = {
    'Small': ['MVC', 'MVVM'],
    'Medium': ['Provider', 'BLoC'],
    'Large': ['Clean Architecture', 'Feature-First']
  };
  // Getters for text controllers
  TextEditingController get projectNameController => _projectNameController;
  TextEditingController get foldersController => _foldersController;
  TextEditingController get searchController => _searchController;

  String? get selectedArchitectureGetter => _selectedArchitecture;

  String? get selectedScaleGetter => _selectedScale;
  bool get showAdvancedOptions => _showAdvancedOptions;
  bool get includeTemplateFiles => _includeTemplateFiles;
  String get searchText => _searchText = _searchController.text;
  bool get isGenerating => _isGenerating;

  void initializeAnimationControllers(TickerProvider vsync) {
    _rotationController = AnimationController(
      vsync: vsync,
      duration: const Duration(seconds: 10),
    )..repeat();

    _scaleController = AnimationController(
      vsync: vsync,
      duration: const Duration(milliseconds: 200),
    );

    _bounceController = AnimationController(
      vsync: vsync,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
  }

  // Setters for text controllers
  set showAdvancedOptions(bool value) {
    _showAdvancedOptions = value;
    notifyListeners();
  }

  set includeTemplateFiles(bool value) {
    _includeTemplateFiles = value;
    notifyListeners();
  }

  set selectedScale(String scale) {
    _selectedScale = scale;
    notifyListeners();
  }

  set selectedArchitecture(String arch) {
    _selectedArchitecture = arch;
    notifyListeners();
  }

  // Getters for animation controllers
  AnimationController get rotationControllerGetter => _rotationController;
  AnimationController get scaleControllerGetter => _scaleController;
  AnimationController get bounceControllerGetter => _bounceController;


  Future<void> animateGeneration() async {
    _isGenerating = true;
    
    await Future.delayed(const Duration(seconds: 2));

    _isGenerating = false;
    notifyListeners();
  }

  void generateStructure(BuildContext context) async {
    debugPrint('Generating structure...');
    debugPrint('Project Name ${_projectNameController.text}');
    debugPrint('Selected architecture: $_selectedArchitecture');
    if (_projectNameController.text.isNotEmpty && _selectedArchitecture != null) {
    
    // Start the generation animation
    await animateGeneration();

    final provider = Provider.of<FolderProvider>(context, listen: false);
    
    provider.generateFolderStructure(
      _projectNameController.text,
      _selectedArchitecture!,
      _foldersController.text.isEmpty 
        ? [] 
        : _foldersController.text.split(',')
          .map((e) => e.trim())
          .where((e) => e.isNotEmpty)
          .toList(),
          includeTemplateFiles: includeTemplateFiles,
    );
    
    // Show success message with animation
    Utils.showSnackBar(context, 'Structure generated successfully!', false);
    } else {
      Utils.showSnackBar(context, 'Please fill in required fields', true);
    }
  }

  @override
  void dispose() {
    _projectNameController.dispose();
    _foldersController.dispose();
    _searchController.dispose();
    _rotationController.dispose();
    _scaleController.dispose();
    _bounceController.dispose();
    super.dispose();
  }


  Future<void> generateProject() async {
    debugPrint('Generating project...');
    final folder =  _foldersController.text.split(",").map((e) => e.trim()).toList();
    final sss = folder.toString();
    debugPrint('Selected folders: $folder');
    debugPrint('Selected architecture: $_selectedArchitecture');
    debugPrint('Project Name: ${_projectNameController.text}');
    try {
      final response = await http.post(
      Uri.parse("https://flutter-folder-generator.onrender.com/generate-project"),
      // headers: {"Content-Type": "application/json"},
      body: {
        "projectName": _projectNameController.text,
        "architecture": _selectedArchitecture,
        "customFolders": sss,
      },
    );

    debugPrint('Response status code: ${response.statusCode}');
    debugPrint('Response status: ${response.body}');
    if (response.statusCode == 200) {
      print("Project generated successfully!");
    } else {
      print("Failed to generate project");
    }
    } catch (e) {
      print("Failed to generate project: $e");
      }
  }

  void getProjects() async {
    final testResponse = await http.get(Uri.parse("https://flutter-folder-generator.onrender.com/projects"));
    print("Test response: ${testResponse.statusCode}");
  }
}