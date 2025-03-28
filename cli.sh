#!/bin/bash

dev_app() {
  echo "START run developer mode"
  get_env $1;

  if [[ $WORK_MODE == "ADMIN" ]]
    then
      downloadLocales $1; build_icons; generate_graphql $1; node_modules/.bin/env-cmd -f ./packages/config/.env."$ENV_FILE" npm run dev --workspace=@game-trade/admin;
  else
    downloadLocales $1; build_icons; generate_graphql $1; node_modules/.bin/env-cmd -f ./packages/config/.env."$ENV_FILE" npm run dev --workspace=@game-trade/app;
  fi
}

deploy_app() {
  echo "START deploy and build app"
  get_env $1;
  echo $WORK_MODE > ./.mode
  downloadLocales $1; build_icons; generate_graphql $1; lint; build_app $1;
  echo "COMPLETE deploy and build app"
}

build_app() {
  set -e
  echo "START npm run build"

  if [[ $ENV_FILE ]]
    then
      if [[ $WORK_MODE == "ADMIN" ]]
        then
          node_modules/.bin/env-cmd -f ./packages/config/.env."$ENV_FILE" npm run build --workspace=@game-trade/admin
      else
        node_modules/.bin/env-cmd -f ./packages/config/.env."$ENV_FILE" npm run build --workspace=@game-trade/app
      fi
  else
    if [[ $WORK_MODE == "ADMIN" ]]
      then
        npm run build --workspace=@game-trade/admin
    else
      npm run build --workspace=@game-trade/app
    fi
  fi
}

start_app() {
  get_env $1;
  FILE_MODE=$(< ./.mode)
  echo 'WORK_MODE: ' + $FILE_MODE + ' || ' + $WORK_MODE
  if [[ $FILE_MODE == "ADMIN" ]] || [[ $WORK_MODE == "ADMIN" ]]
    then
      npm run start --workspace=@game-trade/admin
  else
    npm run start --workspace=@game-trade/app
  fi
}

# Hooks logic

generate_graphql() {
  export NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED
  echo "START generate-graphql"
  get_env $1;

  node_modules/.bin/graphql-codegen --config packages/lib/codegen.yml
}

downloadLocales() {
  echo "START downloadLocales"

  sudo rm -rf ./packages/app/public/locales/*
  sudo rm -rf ./packages/admin/public/locales/*

  wait
  echo "$PRIVATE_KEY" > /root/.ssh/id_rsa
  wait
  chmod 600 /root/.ssh/id_rsa
  wait

  if git clone git@github.com:oqtacore-group/GameTradeMarket-i18n-public.git; then
    echo "Git clone successful"
    mkdir -p packages/app/public/locales/
    mkdir -p packages/admin/public/locales/
    sudo cp -rf ./GameTradeMarket-i18n-public/locales/* packages/app/public/locales/
    sudo cp -rf ./GameTradeMarket-i18n-public/locales/* packages/admin/public/locales/
    wait
    rm -rf ./GameTradeMarket-i18n-public
    echo "remove languages"
    echo "All done downloadLocales"
  else
    echo "Git clone failed"
  fi
}

build_icons() {
  echo "START build_icons"
	npm run icons
  echo "COMPLETE build_icons"
}

# End Hooks logic

# Helpers

get_env() {
  branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)

  if [[ $1 = "local" ]]
    then
      ENV_FILE='local'
      source ./packages/config/.env.local
  elif [[ $branch = "release" ]]
    then
      ENV_FILE='prod'
      source ./packages/config/.env.prod
  elif [[ $branch ]]
    then
      ENV_FILE='dev'
      source ./packages/config/.env.dev
  else
    echo '------------'
    echo 'NO LOCAL VARIABLES (.packages/config/.env.*)'
  fi

  echo '------------'
  echo 'node.js: '"$(node -v)"
  echo 'npm: v'"$(npm -v)"
  next -v
  echo '------------'
  echo 'COMMAND_VARIABLE: ' + $1
  echo 'WORK_MODE:        ' + $WORK_MODE
  echo 'BRANCH:           ' + $branch
  echo 'BACKEND_LOCAL?:   ' + $NEXT_PUBLIC_LOCAL
  echo 'STAND:            ' + $NEXT_PUBLIC_PATHNAME_PREFIX
  echo 'GQ_SCHEMA_URL:    ' + $NEXT_PUBLIC_GQ_SCHEMA_URL
  echo 'WS_URL:           ' + $NEXT_PUBLIC_WS_URL
  echo 'GQ_URL:           ' + $NEXT_PUBLIC_GQ_URL
  echo 'UPDATING_SITE:    ' + $NEXT_PUBLIC_UPDATING_SITE
  echo 'DEVELOPMENT_MODE: ' + $NEXT_PUBLIC_DEVELOPMENT_MODE
  echo 'SOLANA_NODE_API_KEY: ' + $NEXT_PUBLIC_SOLANA_NODE_API_KEY
  echo 'METAPLEX_GTM_ADDR: ' + $NEXT_PUBLIC_METAPLEX_AUCTION_HOUSE_GAME_TRADE_MARKET
  echo 'METRICS_BOT_TOKEN: ' + $METRICS_BOT_TOKEN
  echo 'REPORT_BOT_TOKEN: ' + $REPORT_BOT_TOKEN
  echo 'NOTIFICATION_BOT_TOKEN: ' + $NOTIFICATION_BOT_TOKEN
  echo '------------'

  export NEXT_PUBLIC_GQ_SCHEMA_URL=$NEXT_PUBLIC_GQ_SCHEMA_URL
}

npm_install() {
  echo "START Install Main Dependencies  ===  npm_install"
	# shellcheck disable=SC2164
	node -v
	npm -v
	yarn cache clean
	yarn install --frozen-lockfile
	wait
  echo "All done"
}

remove_modules() {
  echo "Remove Dependencies"
	# shellcheck disable=SC2164
	rm -rf ./node_modules &
	cd ./packages/app
	rm -rf ./node_modules &
	cd ../admin
  rm -rf ./node_modules &
	cd ../components
	rm -rf ./node_modules &
	cd ../lib
  rm -rf ./node_modules &
  cd ../icons
  rm -rf ./node_modules &
  cd ../config
  rm -rf ./node_modules &
	cd ../../
	wait
  echo "Remove Dependencies done"
}

lint() {
  npm run eslint
}

cli_help() {
  echo "Something is wrong if you see this. 1) Check the array being iterated at the end of the cli.sh file and if there is a missing function, add it. Or there is an error in the function call itself"
  exit 1
}

is_executable() {
  typeset TYPE_RESULT="$(type -t "$1")"
  if [ "$TYPE_RESULT" == 'function' ]; then
    return 0
  else
    return 1
  fi
}

case "$1" in
  dev_app|start_app|deploy_app|generate_graphql|build_icons|npm_install|downloadLocales|lint|remove_modules)
    command=$1
    shift
    $command "$*"
    ;;
  *)
    cli_help
    ;;
esac
