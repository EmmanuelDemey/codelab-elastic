function setup() {
    rm -Rf ./.tmp
    mkdir ./.tmp
    go get github.com/Gillespie59/tools/claat
}

function build(){
    cat ./step0/README.md ./step1/README.md ./step2/README.md ./step3/README.md ./step4/README.md ./step5/README.md ./step6/README.md > ./.tmp/index.md
    claat export  ./.tmp/index.md
    claat install
     
}

function deploy(){
    pushd elastic-codelab
    firebase deploy
    popd
}

function main() {
  setup && build && deploy
}

main