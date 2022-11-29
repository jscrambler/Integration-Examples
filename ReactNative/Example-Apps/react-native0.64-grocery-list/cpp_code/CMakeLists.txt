cmake_minimum_required(VERSION 3.4.1)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(awesomeproject-cpp
  SHARED
  cpp-adapter.cpp
  ./src/Hello.cpp
)
