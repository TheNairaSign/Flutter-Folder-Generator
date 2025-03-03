import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';

class ProjectNameController extends StatefulWidget {
  const ProjectNameController({super.key});

  @override
  State<ProjectNameController> createState() => _ProjectNameControllerState();
}

class _ProjectNameControllerState extends State<ProjectNameController> with SingleTickerProviderStateMixin {

  @override
  Widget build(BuildContext context) {
    final constProv = context.read<ConstantsProvider>();
    return TextField(
      controller: constProv.projectNameController,
      decoration: const InputDecoration(
        labelText: 'Project Name',
        prefixIcon: Icon(Icons.folder),
        hintText: 'Enter your project name',
      ),
    ).animate()
    .fadeIn(duration: 500.ms, delay: 200.ms)
    .slideY(begin: 0.1, end: 0, duration: 500.ms, curve: Curves.easeOutQuad);
  }
}