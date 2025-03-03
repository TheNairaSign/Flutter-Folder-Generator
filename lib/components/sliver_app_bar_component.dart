import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:auto_generate_file/ui/slivers/sliver_app_bar_container.dart.dart';
import 'package:auto_generate_file/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';

class SliverAppBarComponent extends StatelessWidget {
  const SliverAppBarComponent({super.key});

  @override
  Widget build(BuildContext context) {
    final constProv = Provider.of<ConstantsProvider>(context);

    return SliverAppBar(
      expandedHeight: 150,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        title: const Text('Flutter Folder Generator', 
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))
          .animate()
          .fadeIn(duration: 600.ms, curve: Curves.easeOutQuad)
          .slideY(begin: 0.2, end: 0, duration: 600.ms, curve: Curves.easeOutQuad),
        background: SliverAppBarContainer(rotationController: constProv.rotationControllerGetter, bounceController: constProv.bounceControllerGetter)
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.info_outline, color: Colors.white),
          onPressed: () => Utils.showInfoDialog(context, constProv.architectureOptions),
        ),
      ],
    );
  }
}