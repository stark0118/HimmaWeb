DIR_INC = -I./
DIR_LIB = -L./
TARGET	= ../releasejscallc/ttt
CFLAGS = -g -Wall $(DIR_INC) $(DIR_LIB)
LDFLAGS += -lstdc++
SRCDIR:=
SRCS := $(wildcard *.cpp) $(wildcard $(addsuffix /*.cpp, $(SRCDIR)))
OBJECTS := $(patsubst %.c,%.o,$(SRCS))
$(TARGET) : $(OBJECTS)
	gcc $(CFLAGS) $^ -o $@ $(LDFLAGS)
	cp ../jscallc/ttt_proxy.js ../releasejscallc/
	cp ../jscallpython/ttt_proxy.js ../releasejscallpython/
	cp ../python/ttt_imp.py ../releasejscallpython/
	chmod +x ../releasejscallpython/ttt_imp.py
%.o : %.c
	gcc -c $(CFLAGS) $< -o $@
clean:
	@rm -f *.o $(TARGET)
	rm -rf ../releasejscallc/*
	rm -rf ../releasejscallpython/*
.PHONY:clean