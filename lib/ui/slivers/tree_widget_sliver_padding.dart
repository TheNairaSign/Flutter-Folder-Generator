import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:auto_generate_file/providers/folderProvider.dart';
import 'package:auto_generate_file/ui/widgets/treeViewWidget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';

class TreeWidgetSliverPadding extends StatelessWidget {
  const TreeWidgetSliverPadding({super.key});

  @override
  Widget build(BuildContext context) {
    final folderProvider = Provider.of<FolderProvider>(context);
    final provider = Provider.of<ConstantsProvider>(context);
    return SliverPadding(
      padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 16.0),
      sliver: SliverToBoxAdapter(
        child: SizedBox(
          height: 300, // Fixed height for the tree view
          child: Card(
            elevation: 4,
            shadowColor: Colors.blue.withOpacity(0.3),
            child: folderProvider.rootNode == null ? 
            null :  Padding(
              padding: const EdgeInsets.all(8.0),
                child: TreeViewWidget(searchText: provider.searchText.toString())
            ),
          ).animate()
          .fadeIn(duration: 600.ms, delay: 200.ms)
          .scale(begin: const Offset(0.95, 0.95), curve: Curves.easeOutQuad),
        ),
      ),
    );
  }
}