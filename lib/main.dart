import 'package:auto_generate_file/folder_generator_app.dart';
import 'package:auto_generate_file/providers/constants_provider.dart';
import 'package:auto_generate_file/providers/folderProvider.dart';
import 'package:auto_generate_file/styles/lightTheme.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
      ChangeNotifierProvider(create: (context) =>  FolderProvider()),
      ChangeNotifierProvider(create: (context) =>  ConstantsProvider()),

      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Flutter Folder Generator',
        theme: lightTheme,
        home: const FolderGeneratorApp(),
      ),
    ),
  );
}
