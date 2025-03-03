import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class Utils {
  static void showInfoDialog(BuildContext context, Map<String, List<String>> architectureOptions) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('About Flutter Folder Generator'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('This app helps you generate folder structures for Flutter projects based on different architectural patterns.'),
            const SizedBox(height: 16),
            const Text('Available Architectures:'),
            const SizedBox(height: 8),
            ...architectureOptions.values.expand((e) => e).map((arch) => 
              Padding(
                padding: const EdgeInsets.only(left: 16.0, bottom: 4.0),
                child: Text('• $arch'),
              )
            ),
            const SizedBox(height: 16),
            const Text('You can add custom folders and export the structure as a ZIP file.'),
          ],
        ).animate().fadeIn(duration: 300.ms).slideY(begin: 0.1, end: 0),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  static void showThemeDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Choose Theme'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text('Blue Theme'),
              leading: const CircleAvatar(backgroundColor: Colors.blue),
              onTap: () {
                Navigator.of(context).pop();
                // Would implement theme change here
              },
            ),
            ListTile(
              title: const Text('Purple Theme'),
              leading: const CircleAvatar(backgroundColor: Colors.purple),
              onTap: () {
                Navigator.of(context).pop();
                // Would implement theme change here
              },
            ),
            ListTile(
              title: const Text('Green Theme'),
              leading: const CircleAvatar(backgroundColor: Colors.green),
              onTap: () {
                Navigator.of(context).pop();
                // Would implement theme change here
              },
            ),
          ],
        ).animate().fadeIn(duration: 300.ms, delay: 100.ms).slideY(begin: 0.1, end: 0),
      ),
    );
  }

  static void showSnackBar(BuildContext context, String message, bool isError) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(isError ? Icons.error : Icons.check_circle, color: Colors.white),
            const SizedBox(width: 8),
            Text(message),
          ],
        ),
        backgroundColor: isError? Colors.red : Colors.green,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        action: SnackBarAction(
          label: 'View',
          textColor: Colors.white,
          onPressed: () {
            // Scroll to view the structure
          },
        ),
      ),
    );
  }
}