{
  description = "Web II Project";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, nixpkgs, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        web-ii-project = pkgs.stdenv.mkDerivation {
          name = "web-ii-project";
          src = ./.;
          nativeBuildInputs = [ pkgs.nodejs_23 ];

          installPhase = ''
            mkdir -p $out
            cp -r ./ $out/
            cd $out
            npm install --omit=dev
          '';
        };
      in {
        devShell = pkgs.callPackage ./nix/devShell.nix {};
        formatter = pkgs.alejandra;

        packages = {
          web-ii-project = web-ii-project;
          default = web-ii-project;
        };

        defaultPackage = web-ii-project;
      }
    );
}