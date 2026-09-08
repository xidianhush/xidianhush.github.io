
# 介绍`Widget`类

## 先介绍`Widget`

```dart
// ignore_for_file: must_be_immutable, prefer_const_constructors

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.blue,
      ),
    );
  }
}

```


+ `Widget`类 类型的数据
+ 属性
+ 给某个`Widegt`类的构造函数中的的属性传参数 实例化出具体的对象 这个对象会出现页面上

## 一些问题

https://chatgpt.com/share/698d4c68-97e8-8008-9041-fa095925568b

## `StatelessWidget`

示例代码：

```dart
import 'package:flutter/material.dart';
import 'package:newapp/pages/second_page.dart';

class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("1st Page")),
      body: Center(
        child: ElevatedButton(
          child: Text("Go To Second Page"),
          onPressed: () {
            // navigate to second page
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => SecondPage(),
              ), // MaterialPageRoute
            );
          },
        ), // ElevatedButton
      ), // Center
    ); // Scaffold
  }
}

```

## `StatefulWidget`

示例代码：

```dart
import 'package:flutter/material.dart';

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  // variable
  int _counter = 0;

  // method

  // UI (user interface)
  @override
  Widget build(BuildContext context) {
    return Scaffold();
  }
} 
```
# 导航和`Navigator`类

+ 路由`route`