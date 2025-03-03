class Models {
  static final Map<String, List<String>> architectureTemplates = {
    'MVC': [
      'lib/models',
      'lib/views',
      'lib/controllers',
      'lib/services',
      'lib/utils',
      'assets',
      'test'
    ],
    'MVVM': [
      'lib/models',
      'lib/views',
      'lib/viewmodels',
      'lib/services',
      'lib/utils',
      'assets',
      'test'
    ],
    'Provider': [
      'lib/models',
      'lib/views',
      'lib/providers',
      'lib/services',
      'lib/utils',
      'lib/widgets',
      'assets',
      'test'
    ],
    'BLoC': [
      'lib/models',
      'lib/views',
      'lib/bloc',
      'lib/repositories',
      'lib/services',
      'lib/utils',
      'lib/widgets',
      'assets',
      'test'
    ],
    'Clean Architecture': [
      'lib/presentation/screens',
      'lib/presentation/widgets',
      'lib/presentation/bloc',
      'lib/domain/entities',
      'lib/domain/usecases',
      'lib/domain/repositories',
      'lib/data/models',
      'lib/data/repositories',
      'lib/data/datasources',
      'lib/core/utils',
      'lib/core/errors',
      'lib/core/network',
      'assets/images',
      'assets/fonts',
      'test/presentation',
      'test/domain',
      'test/data'
    ],
    'Feature-First': [
      'lib/features/authentication/data',
      'lib/features/authentication/domain',
      'lib/features/authentication/presentation',
      'lib/features/home/data',
      'lib/features/home/domain',
      'lib/features/home/presentation',
      'lib/features/profile/data',
      'lib/features/profile/domain',
      'lib/features/profile/presentation',
      'lib/core/utils',
      'lib/core/network',
      'lib/core/theme',
      'lib/core/widgets',
      'assets/images',
      'assets/fonts',
      'test'
    ],
  };

  // Template files to include for common folders
  static final Map<String, String> templateFiles = {
    'lib/models': 'user_model',
    'lib/views': 'home_screen',
    'lib/controllers': 'auth_controller',
    'lib/viewmodels': 'home_viewmodel',
    'lib/providers': 'theme_provider',
    'lib/bloc': 'app_bloc',
    'lib/services': 'api_service',
    'lib/utils': 'constants',
    'lib/widgets': 'custom_button',
    'lib/core/theme': 'app_theme',
    'lib/core/utils': 'helpers',
    'lib/core/network': 'api_client',
    'lib/core/errors': 'exceptions',
    'assets/images': '.gitkeep',
    'assets/fonts': '.gitkeep',
    'test': 'widget_test',
  };

}