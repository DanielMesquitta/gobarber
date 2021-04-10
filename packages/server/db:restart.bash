for i in 1 2 3 4 5
do
  yarn db:revert
done
yarn db:migrate
