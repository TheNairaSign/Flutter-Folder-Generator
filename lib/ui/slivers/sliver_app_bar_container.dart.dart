import 'package:flutter/material.dart';
import 'dart:math' as math;

class SliverAppBarContainer extends StatefulWidget {
  const SliverAppBarContainer({super.key, required this.rotationController, required this.bounceController});
  final AnimationController rotationController, bounceController;

  @override
  State<SliverAppBarContainer> createState() => _SliverAppBarContainerState();
}

class _SliverAppBarContainerState extends State<SliverAppBarContainer> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Colors.blue.shade800, Colors.indigo.shade600],
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            right: 20,
            top: 60,
            child: AnimatedBuilder(
              animation: widget.rotationController,
              builder: (context, child) {
                return Transform.rotate(
                  angle: widget.rotationController.value * 2 * math.pi,
                  child: Icon(
                    Icons.folder_special,
                    size: 40,
                    color: Colors.white.withOpacity(0.2),
                  ),
                );
              },
            ),
          ),
          Positioned(
            left: 20,
            bottom: 60,
            child: AnimatedBuilder(
              animation: widget.bounceController,
              builder: (context, child) {
                return Transform.translate(
                  offset: Offset(0, widget.bounceController.value * 5),
                  child: Icon(
                    Icons.folder_copy,
                    size: 30,
                    color: Colors.white.withOpacity(0.15),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}