import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';

class GenerateButton extends StatelessWidget {
  const GenerateButton({super.key});

  @override
  Widget build(BuildContext context) {
    final constProv = Provider.of<ConstantsProvider>(context);
    return ElevatedButton.icon(
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 16),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 50),
      ),
      icon: const Icon(Icons.play_arrow),
      label: const Text('Generate Structure'),
      onPressed: () => constProv.generateProject()
    ).animate()
    .fadeIn(duration: 500.ms, delay: 600.ms)
    .slideY(begin: 0.1, end: 0, duration: 500.ms, curve: Curves.easeOutQuad)
    .shimmer(duration: 1200.ms, delay: 600.ms, curve: Curves.easeInOutSine);
  }
}