# ligand-binding-deep-learning

Complete pipeline to run the ligand binding affinity prediction using deep learning.
Consult the help (`--help`) for the parameter names and more details.

## create-mapping

Creates the model I/O names and the `nn-mapping` file.
Runs by default for all targets.
That will generate files with all possible SMILES tokens for that dataset. 

## create-dataset

Creates all files for a specific target to train and test a neural network.

## Example

The `example-5-ht2a.sh` script will generate all files to train and run the ligand binding prediction for the receptor 5-ht2a with 0 and 75 alternatives.
Install [Keras Gaia](https://github.com/bergos/keras_gaia) to train and run the example projects in `examples/projects`.
The pathes are relative to the `examples` folder.