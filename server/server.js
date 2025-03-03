const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { dartTemplates } = require('./constants/templates');
const { architectureTemplates } = require('./constants/architecture_template');

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