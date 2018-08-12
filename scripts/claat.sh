function setup() {
    rm -Rf ./.tmp
    mkdir ./.tmp
}

function build(){
    cat ./step0/README.md ./step1/README.md ./step2/README.md ./step3/README.md ./step4/README.md ./step5/README.md > ./.tmp/index.md
     ~/go/bin/claat export  ./.tmp/index.md
}


function main() {
  setup && build
}

main