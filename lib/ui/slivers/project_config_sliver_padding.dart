import 'package:auto_generate_file/ui/widgets/project_config_card.dart';
import 'package:flutter/material.dart';

class ProjectConfigSliverPadding extends StatefulWidget {
  const ProjectConfigSliverPadding({super.key});

  @override
  State<ProjectConfigSliverPadding> createState() => _ProjectConfigSliverPaddingState();
}

class _ProjectConfigSliverPaddingState extends State<ProjectConfigSliverPadding> {
  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: const EdgeInsets.all(16.0),
      sliver: SliverList(
        delegate: SliverChildListDelegate([
          const ProjectConfigCard()
        ]),
      ),
    );
  }
}