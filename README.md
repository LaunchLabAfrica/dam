# StaticAssets
This simple applications lets you manage static assets. This current version supports
only pdfs.


# TODO
Features/Docs to add
- [Contentful setup instructions](contentful.com)
- Image/Audio support
- Download functionality ( i.e button )

# Usage

Install

```
npm install
```

_Note_: Add contentful keys in `config.js`

Run 

```
npm run dev
```

visit [http://localhost:3000](http://localhost:3000)

# Contentful
Contentful's Delivery API powers this app. To use your own data, setup a space
in contentful. Here's a [short
guide](https://www.contentful.com/r/knowledgebase/contentful-101/) to
understand how contentful works.

# Content Structure
Once you have contenful figured out. You can setup up a content type to look
like so:
```
{
  "name": "Asset",
  "description": "",
  "displayField": "name",
  "fields": [
    {
      "name": "Title",
      "id": "name",
      "type": "Symbol",
      "validations": [],
      "localized": false,
      "required": false,
      "disabled": false,
      "omitted": false
    },
    {
      "name": "Description",
      "id": "description",
      "type": "Text",
      "localized": false,
      "required": false,
      "disabled": false,
      "omitted": false,
      "validations": []
    },
    {
      "name": "Files",
      "id": "files",
      "type": "Array",
      "items": {
        "type": "Link",
        "linkType": "Asset"
      }
    }
  ]
}
```

The app fetches all Assets within the space and serves them on this route `/file/:fileName`. 

Visit `/pages/file.js` to get a better sense of what's going on. 


# License
MIT

