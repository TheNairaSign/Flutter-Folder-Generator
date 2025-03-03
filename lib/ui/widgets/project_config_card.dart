import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:auto_generate_file/ui/widgets/custom_dropdown.dart';
import 'package:auto_generate_file/ui/widgets/extra_folders_field.dart';
import 'package:auto_generate_file/ui/widgets/generate_button.dart';
import 'package:auto_generate_file/ui/widgets/project_name_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';

class ProjectConfigCard extends StatefulWidget {
  const ProjectConfigCard({super.key});

  @override
  State<ProjectConfigCard> createState() => _ProjectConfigCardState();
}

class _ProjectConfigCardState extends State<ProjectConfigCard> {
  @override
  Widget build(BuildContext context) {
    final constProv = Provider.of<ConstantsProvider>(context);
    return Card(
      elevation: 4,
      shadowColor: Colors.blue.withOpacity(0.3),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Project Configuration', style: Theme.of(context).textTheme.titleLarge)
              .animate()
              .fadeIn(duration: 500.ms, delay: 100.ms)
              .slideX(begin: -0.1, end: 0, duration: 500.ms, curve: Curves.easeOutQuad),
            const SizedBox(height: 16),
            const ProjectNameController(),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: CustomDropdown(
                    initialValue: constProv.selectedScaleGetter, 
                    items: constProv.scales, label: 'App Scale', 
                    onChanged: (value) => constProv.selectedScale = value,
                    icon: const Icon(Icons.scale),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: AnimatedBuilder(
                    animation: constProv.scaleControllerGetter,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: 1.0 + constProv.scaleControllerGetter.value * 0.05,
                        child: CustomDropdown(
                          initialValue: constProv.selectedArchitectureGetter, 
                          items: constProv.architectureOptions[constProv.selectedScaleGetter]?.toList(), label: 'Architecture', 
                          onChanged: (value) => constProv.selectedArchitecture = value, 
                          icon: const Icon(Icons.architecture),
                        ),
                      );
                    },
                  ).animate()
                  .fadeIn(duration: 500.ms, delay: 400.ms)
                  .slideY(begin: 0.1, end: 0, duration: 500.ms, curve: Curves.easeOutQuad),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            ExpansionPanelList(
              elevation: 1,
              expandedHeaderPadding: EdgeInsets.zero,
              animationDuration: const Duration(milliseconds: 300),
              expansionCallback: (int index, bool isExpanded) {
                setState(() {
                  constProv.showAdvancedOptions = !isExpanded;
                });
              },
              children: [
                ExpansionPanel(
                  headerBuilder: (context, isExpanded) {
                    return const ListTile(
                      title: Text('Advanced Options'),
                      leading: Icon(Icons.settings),
                    );
                  },
                  body: const ExtraFoldersField(),
                  isExpanded: constProv.showAdvancedOptions,
                ),
              ],
            ).animate()
            .fadeIn(duration: 500.ms, delay: 500.ms)
            .slideY(begin: 0.1, end: 0, duration: 500.ms, curve: Curves.easeOutQuad),
            
            const SizedBox(height: 20),
            
            constProv.isGenerating
              ? const Center(
                  child: Column(
                    children: [
                      // Lottie.asset(
                      //   'assets/folder-animation.json',
                      //   width: 150,
                      //   height: 150,
                      //   fit: BoxFit.contain,
                      // ),
                      SizedBox(height: 8),
                      Text('Generating structure...'),
                    ],
                  ),
                )
              : const GenerateButton(),
          ],
        ),
      ),
    );
  }
}