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