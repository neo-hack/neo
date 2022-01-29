# aiou
*common generator for templates under @aiou/*

## usage

1. create `.neo/.neorc` in template
2. set follow content

    ```json
    {
      "mario": "@aiou/generator-aiou" 
    }
    ```

## features

- reset version to `0.0.0`
- replace template name with `inputs.project`
- replace origination name with `github.user.name`