#Trail Blazer

The drone flight planner :) 

This project runs with [io.js](https://iojs.org/).

## Installing iojs through NVM
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
nvm install iojs-2.4
nvm use iojs-2.4
nvm alias default iojs-2.4
```
## Installing babel
```
npm i -g babel
```

## Start the servidor:
```
cd ~/git/trail-blazer
npm install
npm start
```

## In case you need to remove your old node installation:
```
sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}
```

## Forecast
The wind speed feature uses forecast as api. You need a key to use it, grab one at [https://developer.forecast.io/register](https://developer.forecast.io/register) and put it [here](https://github.com/prodec/trail-blazer/blob/master/src/js/utils/windApi.js#L15): 

