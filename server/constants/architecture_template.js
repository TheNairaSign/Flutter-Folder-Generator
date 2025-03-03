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