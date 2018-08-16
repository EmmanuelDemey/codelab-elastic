function setup() {
    rm -Rf ./.tmp
    mkdir ./.tmp
}

function build(){
    cat ./step0/README.md ./step1/README.md ./step2/README.md ./step3/README.md ./step4/README.md ./step5/README.md ./step6/README.md > ./.tmp/index.md
    #todo run claat via docker
     ~/go/bin/claat export  ./.tmp/index.md
    #todo run claat serve in order to get bower_components
     
}

function deploy(){
    pushd elastic-codelab
    firebase deploy
    popd
}

function main() {
  setup && build
}

main