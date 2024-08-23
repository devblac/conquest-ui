compile_library:
	cd $(GOPATH)/src/github.com/marianogappa/conquest && \
	tinygo build -o wasm.wasm && \
	mv wasm.wasm $(CURDIR)/public/wasm/wasm.wasm && \
	cd -