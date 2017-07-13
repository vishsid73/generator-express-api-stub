git clone git@gitlab.com:Tripin-Inc/api-gateway.git api-gateway-ms/
echo "Copying files..."
cp -R router/ api-gateway-ms/router
echo "Files copied..."
cd api-gateway-ms/
git add .
git commit -m "routes updated"
git push origin master
cd .. && rm -rf api-gateway-ms