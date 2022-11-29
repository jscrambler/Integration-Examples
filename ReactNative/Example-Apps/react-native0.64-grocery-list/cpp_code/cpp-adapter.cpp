#include <jni.h>
#include "src/Hello.h"

extern "C"
JNIEXPORT jstring JNICALL
Java_com_awesomeproject_ToastModule_getCppMessage(JNIEnv *env, jclass type) {
    return env->NewStringUTF(greet().c_str());
}