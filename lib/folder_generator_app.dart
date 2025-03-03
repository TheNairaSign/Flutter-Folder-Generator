import 'package:auto_generate_file/components/sliver_app_bar_component.dart';
import 'package:auto_generate_file/components/theme_changer_floating_action_button.dart';
import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:auto_generate_file/providers/folderProvider.dart';
import 'package:auto_generate_file/ui/slivers/export_sliver_padding.dart';
import 'package:auto_generate_file/ui/slivers/preview_sliver_padding.dart';
import 'package:auto_generate_file/ui/slivers/project_config_sliver_padding.dart';
import 'package:auto_generate_file/ui/slivers/tree_widget_sliver_padding.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
// import 'package:lottie/lottie.dart';

class FolderGeneratorApp extends StatefulWidget {
  const FolderGeneratorApp({super.key});

  @override
  State<FolderGeneratorApp> createState() => _FolderGeneratorAppState();
}

class _FolderGeneratorAppState extends State<FolderGeneratorApp> with TickerProviderStateMixin {

  @override
  void initState() {
    super.initState();
    final constProv = Provider.of<ConstantsProvider>(context, listen: false);
    constProv.initializeAnimationControllers(this);
  }


  @override
  Widget build(BuildContext context) {
    var provider = Provider.of<FolderProvider>(context);
    return Scaffold(
      body: CustomScrollView(
        keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
        slivers: [
          const SliverAppBarComponent(),
          const ProjectConfigSliverPadding(),
          if (provider.rootNode != null) const PreviewSliverPadding(),
          if (provider.rootNode != null) const TreeWidgetSliverPadding(),
          if (provider.rootNode != null) const ExportSliverPadding(),
        ],
      ),
      floatingActionButton: const ThemeChangerFloatingActionButton()
    );
  }

}

