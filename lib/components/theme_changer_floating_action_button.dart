import 'package:auto_generate_file/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class ThemeChangerFloatingActionButton extends StatelessWidget {
  const ThemeChangerFloatingActionButton({super.key});

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        Utils.showThemeDialog(context);
      },
      child: const Icon(Icons.color_lens),
    ).animate()
      .scale(delay: 800.ms, duration: 400.ms, curve: Curves.elasticOut)
      .rotate(delay: 800.ms, duration: 400.ms);
  }
}