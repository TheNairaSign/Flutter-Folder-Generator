const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Project directory setup
const PROJECTS_DIR = path.join(__dirname, 'projects');
fs.ensureDirSync(PROJECTS_DIR);
console.log(`Projects directory: ${PROJECTS_DIR}`);

// Architecture templates
const architectureTemplates = {
  'MVC': ['lib/models', 'lib/views', 'lib/controllers', 'lib/services', 'lib/utils', 'assets', 'test'],
  'MVVM': ['lib/models', 'lib/views', 'lib/viewmodels', 'lib/services', 'lib/utils', 'assets', 'test'],
  'Provider': ['lib/models', 'lib/views', 'lib/providers', 'lib/services', 'lib/utils', 'lib/widgets', 'assets', 'test'],
  'BLoC': ['lib/models', 'lib/views', 'lib/bloc', 'lib/repositories', 'lib/services', 'lib/utils', 'lib/widgets', 'assets', 'test'],
  'Clean Architecture': [
    'lib/presentation/screens', 'lib/presentation/widgets', 'lib/presentation/bloc',
    'lib/domain/entities', 'lib/domain/usecases', 'lib/domain/repositories',
    'lib/data/models', 'lib/data/repositories', 'lib/data/datasources',
    'lib/core/utils', 'lib/core/errors', 'lib/core/network',
    'assets/images', 'assets/fonts',
    'test/presentation', 'test/domain', 'test/data'
  ],
  'Feature-First': [
    'lib/features/authentication/data', 'lib/features/authentication/domain', 'lib/features/authentication/presentation',
    'lib/features/home/data', 'lib/features/home/domain', 'lib/features/home/presentation',
    'lib/features/profile/data', 'lib/features/profile/domain', 'lib/features/profile/presentation',
    'lib/core/utils', 'lib/core/network', 'lib/core/theme', 'lib/core/widgets',
    'assets/images', 'assets/fonts', 'test'
  ]
};

// Dart file templates
const dartTemplates = {
  'models': 'user_model.dart',
  'views': 'home_view.dart',
  'controllers': 'app_controller.dart',
  'viewmodels': 'main_viewmodel.dart',
  'providers': 'auth_provider.dart',
  'bloc': 'app_bloc.dart',
  'repositories': 'data_repository.dart',
  'services': 'api_service.dart',
  'utils': 'helpers.dart',
  'widgets': 'custom_widget.dart',
  'screens': 'main_screen.dart',
  'entities': 'user_entity.dart',
  'usecases': 'get_user_usecase.dart',
  'datasources': 'user_remote_datasource.dart',
  'errors': 'failure.dart',
  'network': 'api_client.dart',
  'domain': 'domain_model.dart',
  'data': 'data_model.dart',
  'presentation': 'ui_component.dart'
};

// Dart boilerplate code
const dartBoilerplate = {
  'user_model.dart': `class UserModel {
  final String id;
  final String name;
  final String email;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
    };
  }
}`,
  'home_view.dart': `import 'package:flutter/material.dart';

class HomeView extends StatelessWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: const Center(
        child: Text('Welcome to the Home Screen'),
      ),
    );
  }
}`,
  'app_controller.dart': `class AppController {
  void initialize() {
    // Initialize app resources
  }

  void dispose() {
    // Clean up resources
  }
}`,
  'main_viewmodel.dart': `import 'package:flutter/foundation.dart';

class MainViewModel extends ChangeNotifier {
  bool _isLoading = false;
  String _error = '';

  bool get isLoading => _isLoading;
  String get error => _error;

  Future<void> loadData() async {
    try {
      _isLoading = true;
      notifyListeners();
      
      // Fetch data here
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = e.toString();
      notifyListeners();
    }
  }
}`,
  'auth_provider.dart': `import 'package:flutter/foundation.dart';

class AuthProvider extends ChangeNotifier {
  bool _isAuthenticated = false;
  String _token = '';

  bool get isAuthenticated => _isAuthenticated;
  String get token => _token;

  Future<void> login(String username, String password) async {
    try {
      // Perform authentication logic
      _isAuthenticated = true;
      _token = 'sample_token';
      notifyListeners();
    } catch (e) {
      _isAuthenticated = false;
      _token = '';
      notifyListeners();
      rethrow;
    }
  }

  void logout() {
    _isAuthenticated = false;
    _token = '';
    notifyListeners();
  }
}`,
  'app_bloc.dart': `import 'package:flutter_bloc/flutter_bloc.dart';

// Events
abstract class AppEvent {}
class AppInitializedEvent extends AppEvent {}
class AppDataLoadedEvent extends AppEvent {}

// States
abstract class AppState {}
class AppInitialState extends AppState {}
class AppLoadingState extends AppState {}
class AppLoadedState extends AppState {}
class AppErrorState extends AppState {
  final String message;
  AppErrorState(this.message);
}

// Bloc
class AppBloc extends Bloc<AppEvent, AppState> {
  AppBloc() : super(AppInitialState()) {
    on<AppInitializedEvent>(_onInitialized);
    on<AppDataLoadedEvent>(_onDataLoaded);
  }

  Future<void> _onInitialized(AppInitializedEvent event, Emitter<AppState> emit) async {
    emit(AppLoadingState());
    try {
      // Initialize app
      emit(AppLoadedState());
    } catch (e) {
      emit(AppErrorState(e.toString()));
    }
  }

  Future<void> _onDataLoaded(AppDataLoadedEvent event, Emitter<AppState> emit) async {
    emit(AppLoadingState());
    try {
      // Load data
      emit(AppLoadedState());
    } catch (e) {
      emit(AppErrorState(e.toString()));
    }
  }
}`,
  'data_repository.dart': `class DataRepository {
  Future<List<dynamic>> fetchData() async {
    try {
      // Fetch data from data source
      return [];
    } catch (e) {
      throw Exception('Failed to fetch data: $e');
    }
  }

  Future<bool> saveData(dynamic data) async {
    try {
      // Save data to data source
      return true;
    } catch (e) {
      throw Exception('Failed to save data: $e');
    }
  }
}`,
  'api_service.dart': `import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl;
  
  ApiService({required this.baseUrl});
  
  Future<Map<String, dynamic>> get(String endpoint) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/$endpoint'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed with status code:');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  Future<Map<String, dynamic>> post(String endpoint, Map<String, dynamic> data) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/$endpoint'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(data),
      );
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed with status code:');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}`,
  'helpers.dart': `import 'package:intl/intl.dart';

class DateHelper {
  static String formatDate(DateTime date) {
    return DateFormat('yyyy-MM-dd').format(date);
  }
  
  static DateTime parseDate(String dateString) {
    return DateFormat('yyyy-MM-dd').parse(dateString);
  }
}

class StringHelper {
  static bool isNullOrEmpty(String? str) {
    return str == null || str.isEmpty;
  }
  
  static String capitalize(String str) {
    if (str.isEmpty) return str;
    return str[0].toUpperCase() + str.substring(1);
  }
}`,
  'custom_widget.dart': `import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? color;
  
  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(text),
    );
  }
}

class LoadingIndicator extends StatelessWidget {
  final String? message;
  
  const LoadingIndicator({Key? key, this.message}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircularProgressIndicator(),
          if (message != null)
            Padding(
              padding: const EdgeInsets.only(top: 16),
              child: Text(message!),
            ),
        ],
      ),
    );
  }
}`,
  'main_screen.dart': `import 'package:flutter/material.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Main Screen'),
      ),
      body: const Center(
        child: Text('Welcome to the app!'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Action
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
  'user_entity.dart': `class UserEntity {
  final String id;
  final String name;
  final String email;

  const UserEntity({
    required this.id,
    required this.name,
    required this.email,
  });
}`,
  'get_user_usecase.dart': `import 'package:dartz/dartz.dart';
import '../entities/user_entity.dart';
import '../repositories/user_repository.dart';
import '../../core/errors/failure.dart';

class GetUserUseCase {
  final UserRepository repository;

  GetUserUseCase(this.repository);

  Future<Either<Failure, UserEntity>> call(String userId) async {
    return await repository.getUser(userId);
  }
}`,
  'user_remote_datasource.dart': `import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../domain/entities/user_entity.dart';
import '../models/user_model.dart';
import '../../core/errors/exceptions.dart';

abstract class UserRemoteDataSource {
  Future<UserModel> getUser(String userId);
}

class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  final http.Client client;
  final String baseUrl;

  UserRemoteDataSourceImpl({required this.client, required this.baseUrl});

  @override
  Future<UserModel> getUser(String userId) async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl/users/$userId'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return UserModel.fromJson(json.decode(response.body));
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }
}`,
  'failure.dart': `abstract class Failure {
  final String message;
  const Failure(this.message);
}

class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

class CacheFailure extends Failure {
  const CacheFailure(String message) : super(message);
}

class NetworkFailure extends Failure {
  const NetworkFailure(String message) : super(message);
}`,
  'api_client.dart': `import 'dart:convert';
import 'package:http/http.dart' as http;
import '../errors/exceptions.dart';

class ApiClient {
  final http.Client client;
  final String baseUrl;

  ApiClient({
    required this.client,
    required this.baseUrl,
  });

  Future<dynamic> get(String endpoint) async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl/$endpoint'),
        headers: {'Content-Type': 'application/json'},
      );

      return _processResponse(response);
    } catch (e) {
      throw NetworkException('Network error: $e');
    }
  }

  Future<dynamic> post(String endpoint, {required Map<String, dynamic> body}) async {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/$endpoint'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(body),
      );

      return _processResponse(response);
    } catch (e) {
      throw NetworkException('Network error: $e');
    }
  }

  dynamic _processResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) return {};
      return json.decode(response.body);
    } else if (response.statusCode >= 400 && response.statusCode < 500) {
      throw ClientException('Client error:');
    } else if (response.statusCode >= 500) {
      throw ServerException('Server error:');
    } else {
      throw UnknownException('Unknown error:');
    }
  }
}`,
  'domain_model.dart': `class DomainModel {
  final String id;
  final String name;

  const DomainModel({
    required this.id,
    required this.name,
  });
}`,
  'data_model.dart': `import '../../domain/entities/domain_model.dart';

class DataModel extends DomainModel {
  const DataModel({
    required String id,
    required String name,
  }) : super(id: id, name: name);

  factory DataModel.fromJson(Map<String, dynamic> json) {
    return DataModel(
      id: json['id'],
      name: json['name'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
    };
  }
}`,
  'ui_component.dart': `import 'package:flutter/material.dart';

class UIComponent extends StatelessWidget {
  final String title;
  
  const UIComponent({
    Key? key,
    required this.title,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.headline6,
            ),
            const SizedBox(height: 8),
            const Text('This is a UI component in the presentation layer'),
          ],
        ),
      ),
    );
  }
}`
};

// Utility function to generate project README
function generateReadme(projectName, architecture, folders) {
  const date = new Date().toISOString().split('T')[0];
  
  let readme = `# ${projectName}\n\n`;
  readme += `Generated on: ${date}\n\n`;
  readme += `## Architecture: ${architecture}\n\n`;
  readme += `This project follows the ${architecture} architectural pattern for Flutter development.\n\n`;
  readme += "### Folder Structure:\n```\n";
  
  // Sort folders to make the structure more readable
  const sortedFolders = [...folders].sort();
  sortedFolders.forEach(folder => readme += `${folder}/\n`);
  
  readme += "```\n\n";
  readme += "### Folder Descriptions:\n";
  
  // Add descriptions for folders based on architectural patterns
  sortedFolders.forEach(folder => {
    if (folder.includes('models')) {
      readme += `- **${folder}**: Contains data models and entity classes.\n`;
    } else if (folder.includes('views') || folder.includes('screens')) {
      readme += `- **${folder}**: Contains UI widgets and screens.\n`;
    } else if (folder.includes('controllers')) {
      readme += `- **${folder}**: Contains controller classes for MVC pattern.\n`;
    } else if (folder.includes('viewmodels')) {
      readme += `- **${folder}**: Contains ViewModel classes for MVVM pattern.\n`;
    } else if (folder.includes('providers')) {
      readme += `- **${folder}**: Contains Provider state management classes.\n`;
    } else if (folder.includes('bloc')) {
      readme += `- **${folder}**: Contains BLoC (Business Logic Component) classes.\n`;
    } else if (folder.includes('repositories')) {
      readme += `- **${folder}**: Contains repository implementations for data access.\n`;
    } else if (folder.includes('services')) {
      readme += `- **${folder}**: Contains service classes for external APIs and functionality.\n`;
    } else if (folder.includes('utils')) {
      readme += `- **${folder}**: Contains utility and helper classes.\n`;
    } else if (folder.includes('widgets')) {
      readme += `- **${folder}**: Contains reusable widget components.\n`;
    } else if (folder.includes('assets')) {
      readme += `- **${folder}**: Contains static assets like images and fonts.\n`;
    } else if (folder.includes('test')) {
      readme += `- **${folder}**: Contains test files for unit, widget, and integration tests.\n`;
    } else if (folder.includes('domain')) {
      readme += `- **${folder}**: Contains domain layer components (Clean Architecture).\n`;
    } else if (folder.includes('data')) {
      readme += `- **${folder}**: Contains data layer components (Clean Architecture).\n`;
    } else if (folder.includes('presentation')) {
      readme += `- **${folder}**: Contains presentation layer components (Clean Architecture).\n`;
    } else if (folder.includes('features')) {
      readme += `- **${folder}**: Contains feature modules (Feature-First Architecture).\n`;
    } else if (folder.includes('core')) {
      readme += `- **${folder}**: Contains core functionality shared across the app.\n`;
    }
  });
  
  readme += "\n## Getting Started\n\n";
  readme += "This project is a starting point for a Flutter application following the " + 
            `${architecture} architecture pattern.\n\n`;
  readme += "For help getting started with Flutter development, view the " +
            "[online documentation](https://docs.flutter.dev/), which offers tutorials, " +
            "samples, guidance on mobile development, and a full API reference.\n";
  
  return readme;
}

// Function to create project structure
async function createProjectStructure(projectPath, architecture, customFolders) {
  console.log(`Creating project structure for ${projectPath} with ${architecture} architecture`);
  
  // Get selected architecture folders or use empty array if architecture doesn't exist
  const selectedArchitecture = architectureTemplates[architecture] || [];
  
  // Combine selected architecture folders and custom folders
  const allFolders = [...selectedArchitecture];
  
  // Add any custom folders that were specified
  if (Array.isArray(customFolders) && customFolders.length > 0) {
    customFolders.forEach(folder => {
      if (folder && folder.trim() !== '') {
        allFolders.push(folder.trim());
      }
    });
  }
  
  // Create each directory and add template files
  for (const folder of allFolders) {
    try {
      const folderPath = path.join(projectPath, folder);
      await fs.ensureDir(folderPath);
      console.log(`Created folder: ${folderPath}`);
      
      // Determine if we should add a template file to this folder
      const matchingKey = Object.keys(dartTemplates).find(key => {
        // Check if the folder path includes this key
        return folder.toLowerCase().includes(key.toLowerCase());
      });
      
      if (matchingKey) {
        const fileName = dartTemplates[matchingKey];
        const filePath = path.join(folderPath, fileName);
        
        // Write the template file or an empty file if no template exists
        const fileContent = dartBoilerplate[fileName] || '// TODO: Add implementation';
        await fs.writeFile(filePath, fileContent);
        console.log(`Created file: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error creating folder ${folder}:`, error);
    }
  }
  
  // Create README.md explaining the structure
  const readmeContent = generateReadme(path.basename(projectPath), architecture, allFolders);
  await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
  console.log(`Created README.md`);
  
  return allFolders;
}

// API endpoints
// GET /health - Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// GET /projects - List all projects
app.get('/projects', (req, res) => {
  try {
    const projects = fs.readdirSync(PROJECTS_DIR)
      .filter(item => {
        const itemPath = path.join(PROJECTS_DIR, item);
        return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
      });
    
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error listing projects:', error);
    res.status(500).json({ error: 'Failed to list projects' });
  }
});

// POST /test - Simple test endpoint for debugging
app.post('/test', (req, res) => {
  console.log('Test endpoint reached, body:', req.body);
  res.status(200).json({ 
    success: true, 
    message: 'Test endpoint working', 
    receivedData: req.body 
  });
});

// POST /generate-project - Generate a new project
app.post('/generate-project', async (req, res) => {
  console.log('Generate project request received:', req.body);
  
  try {
    // Extract request data with validation
    const { projectName, architecture, customFolders } = req.body;
    
    // Validate project name
    if (!projectName || typeof projectName !== 'string' || projectName.trim() === '') {
      return res.status(400).json({ error: 'Project name is required' });
    }
    
    // Sanitize project name (remove special characters)
    const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    
    // Check if project name already exists
    const projectPath = path.join(PROJECTS_DIR, sanitizedProjectName);
    if (fs.existsSync(projectPath)) {
      return res.status(409).json({ error: 'Project with this name already exists' });
    }
    
    // Validate architecture
    if (architecture && !Object.keys(architectureTemplates).includes(architecture)) {
      return res.status(400).json({ error: 'Invalid architecture specified' });
    }
    
    console.log(`Creating Flutter project: ${sanitizedProjectName}`);

    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Run `flutter create` to generate the project
    const flutterCreateCommand = `flutter create --project-name=${sanitizedProjectName} ${projectPath}`;
    console.log(`Executing: ${flutterCreateCommand}`);
    
    exec(flutterCreateCommand, async (err, stdout, stderr) => {
      if (err) {
        console.error('Flutter create error:', stderr);
        // Try to clean up the directory if flutter create failed
        try {
          await fs.remove(projectPath);
        } catch (cleanupErr) {
          console.error('Failed to clean up project directory:', cleanupErr);
        }
        return res.status(500).json({ error: `Failed to create Flutter project: ${stderr}` });
      }
      
      console.log('Flutter create output:', stdout);
      
      try {
        // Create project structure
        const allFolders = await createProjectStructure(
          projectPath, 
          architecture || 'MVC', // Default to MVC if not specified
          customFolders || []
        );
        
        // Create zip file for download
        const zipPath = path.join(PROJECTS_DIR, `${sanitizedProjectName}.zip`);
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        // Listen for archive events
        output.on('close', () => {
          console.log(`ZIP created: ${zipPath}, size: ${archive.pointer()} bytes`);
          
          // Stream the zip file to the client
          res.download(zipPath, `${sanitizedProjectName}.zip`, (err) => {
            if (err) {
              console.error('Error sending zip file:', err);
            } else {
              console.log('Zip file sent successfully');
              
              // Clean up the zip file after sending (optional)
              fs.remove(zipPath).catch(err => {
                console.error('Error cleaning up zip file:', err);
              });
            }
          });
        });
        
        archive.on('error', (err) => {
          console.error('Archive error:', err);
          res.status(500).json({ error: 'Failed to create project archive' });
        });
        
        // Pipe the archive to the output file
        archive.pipe(output);
        
        // Add the entire directory to the archive
        archive.directory(projectPath, false);
        
        // Finalize the archive
        await archive.finalize();
        
      } catch (error) {
        console.error('Error creating project structure:', error);
        res.status(500).json({ error: `Failed to create project structure: ${error.message}` });
      }
    });
    
  } catch (error) {
    console.error('Unexpected error in generate-project endpoint:', error);
    res.status(500).json({ error: `Unexpected error: ${error.message}` });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`- GET  /health - Health check`);
  console.log(`- GET  /projects - List all projects`);
  console.log(`- POST /test - Test endpoint`);
  console.log(`- POST /generate-project - Generate a new Flutter project`);
});