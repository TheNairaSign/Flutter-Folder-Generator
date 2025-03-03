import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ExtraFoldersField extends StatefulWidget {
  const ExtraFoldersField({super.key});

  @override
  State<ExtraFoldersField> createState() => _ExtraFoldersFieldState();
}

class _ExtraFoldersFieldState extends State<ExtraFoldersField> {
  @override
  Widget build(BuildContext context) {
    final constProv = Provider.of<ConstantsProvider>(context);
    return Padding(
      padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            controller: constProv.foldersController,
            decoration: const InputDecoration(
              labelText: 'Extra Folders',
              prefixIcon: Icon(Icons.create_new_folder),
              hintText: 'assets, utils, configs, helpers',
            ),
          ),
          const SizedBox(height: 16),
          SwitchListTile(
            title: const Text('Include Template Files'),
            subtitle: const Text('Generate basic template files in folders'),
            value: constProv.includeTemplateFiles,
            onChanged: (value) {
              setState(() {
                constProv.includeTemplateFiles = value;
              });
            },
          ),
        ],
      ),
    );
  }
}