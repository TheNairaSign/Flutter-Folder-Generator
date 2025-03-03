import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_simple_treeview/flutter_simple_treeview.dart';
import 'package:provider/provider.dart';

class PreviewSliverPadding extends StatefulWidget {
  const PreviewSliverPadding({super.key});

  @override
  State<PreviewSliverPadding> createState() => _PreviewSliverPaddingState();
}

class _PreviewSliverPaddingState extends State<PreviewSliverPadding> {
  final TreeController treeCOntroller = TreeController();
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<ConstantsProvider>(context);
    return  SliverPadding(
      padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 16.0),
      sliver: SliverList(
        delegate: SliverChildListDelegate([
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Folder Structure Preview', 
                style: Theme.of(context).textTheme.titleLarge),
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.refresh),
                    tooltip: 'Collapse All',
                    onPressed: () {
                      treeCOntroller.collapseAll();
                    },
                  ).animate()
                  .scaleXY(begin: 0, end: 1, duration: 300.ms, curve: Curves.elasticOut),
                  IconButton(
                    icon: const Icon(Icons.unfold_more),
                    tooltip: 'Expand All',
                    onPressed: () {
                      treeCOntroller.expandAll();
                    },
                  ).animate()
                  .scaleXY(begin: 0, end: 1, duration: 300.ms, delay: 100.ms, curve: Curves.elasticOut),
                ],
              ),
            ],
          ).animate()
          .fadeIn(duration: 400.ms)
          .slideY(begin: -0.2, end: 0, duration: 400.ms, curve: Curves.easeOutQuad),
          
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: TextField(
              controller: provider.searchController,
              decoration: InputDecoration(
                labelText: 'Search folders',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: provider.searchText.toString().isNotEmpty 
                  ? IconButton(
                      icon: const Icon(Icons.clear),
                      onPressed: () {
                        provider.searchController.clear();
                      },
                    )
                  : null,
              ),
            ),
          ).animate()
          .fadeIn(duration: 400.ms, delay: 100.ms)
          .slideY(begin: -0.2, end: 0, duration: 400.ms, curve: Curves.easeOutQuad),
        ]),
      ),
    );
  }
}