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