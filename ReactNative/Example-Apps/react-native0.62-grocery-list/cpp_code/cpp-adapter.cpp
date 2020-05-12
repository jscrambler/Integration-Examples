#include <jni.h>

extern "C"
JNIEXPORT jstring JNICALL
Java_com_grocerylist_ToastModule_getCppMessage(JNIEnv *env, jclass type) {
    return env->NewStringUTF("Hello from C++");
}