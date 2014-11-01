install:
	npm install
	bower install
	cp -n fig.yml.sample fig.yml

build:
	docker build -t datashaman/perfection .

serve:
	fig up

clean:
	rm -rf node_modules/ src/bower_components/

.PHONY: install build container clean
