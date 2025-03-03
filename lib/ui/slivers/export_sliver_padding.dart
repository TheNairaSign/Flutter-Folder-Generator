import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:auto_generate_file/providers/folderProvider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

class ExportSliverPadding extends StatefulWidget {
  const ExportSliverPadding({super.key});

  @override
  State<ExportSliverPadding> createState() => _ExportSliverPaddingState();
}

class _ExportSliverPaddingState extends State<ExportSliverPadding> {
  
  bool isExporting = false;
  
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<FolderProvider>(context);
    final constProv = Provider.of<ConstantsProvider>(context);
    return SliverPadding(
      padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 32.0),
      sliver: SliverToBoxAdapter(
        child: isExporting
          ? const Center(
              child: Column(
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 8),
                  Text('Preparing export...'),
                ],
              ),
            )
          : ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              minimumSize: const Size(double.infinity, 50),
            ),
            icon: const Icon(Icons.file_download),
            label: const Text('Export and Share'),
            onPressed: provider.rootNode != null
              ? () async {
                  setState(() {
                    isExporting = true;
                  });
                  
                  await Future.delayed(const Duration(seconds: 1));
                  
                  final zipPath = await provider.zipAndShare();
                  
                  setState(() {
                    isExporting = false;
                  });
                  
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: const Text('Project exported successfully!'),
                      backgroundColor: Colors.green,
                      behavior: SnackBarBehavior.floating,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      action: SnackBarAction(
                        label: 'Share',
                        textColor: Colors.white,
                        onPressed: () {
                          Share.shareXFiles(
                            [XFile(zipPath)],
                            text: "Here's your ${constProv.projectNameController.text} project structure!",
                          );
                        },
                      ),
                    ),
                  );
                }
              : null,
          ).animate()
          .fadeIn(duration: 600.ms, delay: 300.ms)
          .slideY(begin: 0.2, end: 0, duration: 600.ms, curve: Curves.easeOutQuad)
          .shimmer(delay: 1500.ms, duration: 1800.ms),
      ),
    );
  }
}