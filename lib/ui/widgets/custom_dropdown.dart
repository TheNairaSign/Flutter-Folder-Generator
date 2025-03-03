// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class CustomDropdown extends StatefulWidget {
  CustomDropdown({super.key, required this.initialValue, required this.items, this.onChanged, required this.label, required this.icon});
  String? initialValue;
  final String label;
  final Icon icon;
  final List<String>? items;
  final void Function(String value)? onChanged;

  @override
  State<CustomDropdown> createState() => _CustomDropdownState();
}

class _CustomDropdownState extends State<CustomDropdown> {
  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: widget.initialValue,
      decoration: InputDecoration(
        labelText: widget.label,
        prefixIcon: widget.icon,
      ),
      items: widget.items?.map((item) {
        return DropdownMenuItem(value: item, child: Text(item));
      }).toList(),
      onChanged: (value) {
        widget.initialValue = value!;
        if (widget.onChanged!= null) {
          widget.onChanged!(value);
        }
      },
    ).animate()
    .fadeIn(duration: 500.ms, delay: 300.ms)
    .slideY(begin: 0.1, end: 0, duration: 500.ms, curve: Curves.easeOutQuad);
  }
}