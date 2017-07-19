git clone git@gitlab.com:Tripin-Inc/apidoc.git apidoc-ms/
echo "Copying files..."
cp -R apidocs/api_data.json apidoc-ms/<%= name %>_ms.json
echo "Files copied..."
node ./compileDocs.js
cd apidoc-ms/
git add .
git commit -m "doc updated"
git push origin master
cd .. && rm -rf apidoc-ms