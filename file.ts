fileProgress(fileInput:any)
  {
    let fileToUpload = <File>fileInput.target.files[0];
    this.fileData = <File>fileInput.target.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:63020/api/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        debugger;
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
         this.table=JSON.stringify(event.body);
         this.parsed=JSON.parse(this.table);
         debugger;
         if(this.columns.length==0)
         {
          for(let i=0;i<this.parsed.count;i++)
          {
            this.col="column"+i;
            this.columns.push(this.col);
 
          }
         
         }
      else if(this.columns.length!=0)
      {
        this.columns.length=0;
        for(let i=0;i<this.parsed.count;i++)
          {
            this.col="column"+i;
            this.columns.push(this.col);
 
          }
      }
