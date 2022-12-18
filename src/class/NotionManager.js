class NotionManager {
  constructor(token) {
    this.apiVersion = '2022-06-28';
    this.token = token;
  }

  getHeaders(){
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Notion-Version': this.apiVersion,
    };
  }
  
  createRecord(databaseId, notionRecord) {
    notionRecord.setParentId(databaseId);
  
    const options = {
      method: 'post',
      headers: this.getHeaders(),
      payload: JSON.stringify(notionRecord.getJson()),
    };

    const res = UrlFetchApp.fetch(
      `https://api.notion.com/v1/pages`,
      options
    );
    return JSON.parse(res.getContentText());
  }

  query(databaseId){
    let options = {
      method: 'post',
      headers: this.getHeaders(),
    };

    let recordList = [];
    let has_more = true;
    let cursor;
    let res;
    while(has_more){

      if(cursor){
        options.payload = JSON.stringify({
          start_cursor: cursor,
        });
      }

      res = UrlFetchApp.fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        options
      );
      
      res = JSON.parse(res.getContentText());
      recordList = recordList.concat(res.results);
      has_more = res.has_more;
      cursor = res.next_cursor;
    }

    return recordList;
  }
}