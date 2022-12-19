class NotionRecord {
  constructor() {
    this.json = {
      parent: {
        database_id: undefined,
      },
      properties: {},
      children: [],
    };
  }

  setParentId(dbId){
    this.json.parent.database_id = dbId;
  }

  setIcon(emoji){
    this.json.icon = {
      'emoji': emoji,
    };
  }

  setTitle(name, text) {
    this.json.properties[name] = {
      title: [{
        text: {
          content: text,
        },
      }],
    };
  }

  setPropertiesDate(name, startDate, endDate) {

    const formatText = 'YYYY-MM-DD';

    this.json.properties[name] = {
      date: {
        start: startDate.format(formatText),
        end: (endDate !== undefined && endDate.isValid()) ? endDate.format(formatText) : null,
      },
    };
  }

  setPropertiesDatetime(name, startDate, endDate) {

    const formatText = 'YYYY-MM-DDTHH:mm:ss.000+09:00';

    this.json.properties[name] = {
      date: {
        start: startDate.format(formatText),
        end: (endDate !== undefined && endDate.isValid()) ? endDate.format(formatText) : null,
      },
    };
  }

  setPropertiesSelect(name, selectName) {
    this.json.properties[name] = {
      select: {
        name: selectName,
      },
    };
  }

  setPropertiesUrl(name, url) {
    this.json.properties[name] = {
      url: url,
    };
  }

  setPropertiesNumber(name, number) {
    this.json.properties[name] = {
      number: number,
    };
  }

  pushChildrenText(text) {
    this.json.children.push({
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: {
            content: text,
          }
        }]
      }
    });
  }

  getJson() {
    return this.json;
  }
}


