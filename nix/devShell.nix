{
  mkShell,
  alejandra,
  docker-compose,
  nodejs_23,
}:
mkShell rec {
  name = "web-ii-project";

  packages = [
    nodejs_23

    alejandra

    docker-compose
  ];
}
