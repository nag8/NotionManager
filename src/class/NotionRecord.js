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

  pushChildrenImage(url) {
    this.json.children.push({
      type: 'image',
      image: {
        type: 'external',
        external: {
          url: url,
        },
      },
    });
  }

  getJson() {
    return this.json;
  }

  
  getContentSlackText(){
    // https://developers.notion.com/reference/block
    return this.json.children.reduce((text, row) => {

      const getPlainText = row => {

        switch(row.type){
          case 'paragraph':
            if(row.paragraph.rich_text[0]?.type === 'mention'){
              return row.paragraph.rich_text[0]?.href;
            }
            return row.paragraph.rich_text[0]?.plain_text;
  
          case 'heading_1':
            const heading_1 = row.heading_1.rich_text[0]?.plain_text;
            return heading_1 ? `\n*${heading_1}*`: undefined;

          case 'heading_2':
            const heading_2 = row.heading_2.rich_text[0]?.plain_text;
            return heading_2 ? `\n*${heading_2}*`: undefined;

          case 'heading_3':
            const heading_3 = row.heading_3.rich_text[0]?.plain_text;
            return heading_3 ? `\n*${heading_3}*`: undefined;
  
          case 'bulleted_list_item':
            const bulleted_list_item = row.bulleted_list_item.rich_text[0]?.plain_text;
            return bulleted_list_item ? `- ${bulleted_list_item}`: undefined;

          case 'bookmark':
            return row.bookmark.url;
  
          default:
            return;
        }
      };
      const rowText = getPlainText(row);
      
      return text += `\n${rowText ? rowText: ''}`;
    }, '');
  }
}


