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