export const configJsonData = [
    {
      master: [
        {
          studio: [
            {
              fieldprop: [
                {
                  formcontrolname:"studioname",
                  label:"Studio",
                  field:"studio",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Studio",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studionamesrccriteria"
                  }
                },
                {
                  formcontrolname:"studiodesc",
                  label:"Description",
                  field:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studiodescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"studio/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          market: [
            {
              fieldprop: [
                {
                  formcontrolname:"marketname",
                  label:"Market",
                  field:"Market",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Market",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"marketnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"marketdesc",
                  label:"Description",
                  field:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"marketdescsrccriteria"
                  }
                },
                {
                  formcontrolname:"pool",
                  label:"Pool",
                  field:"Pool",
                  type:"select",
                  api:"Pool/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Pool",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"poolsrccriteria"
                  }
                },
                {
                  formcontrolname:"region",
                  label:"Region",
                  field:"Region",
                  type:"select",
                  api:"Region/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Region",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"regionsrccriteria"
                  }
                },
                {
                  formcontrolname:"gravity",
                  label:"Gravity",
                  field:"Gravity",
                  type:"select",
                  api:"Gravity/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Gravity",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"gravitysrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"market/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          version: [
            {
              fieldprop: [
                {
                  formcontrolname:"versionname",
                  label:"Version Setup",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Version",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"versionnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"versiondesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"versiondescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"version/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          epp: [
            {
              fieldprop: [
                {
                  formcontrolname:"eppname",
                  label:"EPP Ref",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter EPP Ref",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"eppnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"eppdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"eppdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"EppRef/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          region: [
            {
              fieldprop: [
                {
                  formcontrolname:"regionname",
                  field:"Region",
                  label:"Region",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Region",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"regionnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"regiondesc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"regiondescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"region/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devtype1: [
            {
              fieldprop: [
                {
                  formcontrolname: "devtype1name",
                  label: "Dev Type1",
                  type: "text",
                  api: "",
                  required: false,
                  placeholder: "Enter Dev Type1",
                  action: "",
                  pipe: "",
                  searchcriteria:
                  {
                    formcontrolname: "devtype1namesrccriteria"
                  }
                },
                {
                  formcontrolname: "devtype1desc",
                  label: "Description",
                  type: "textarea",
                  api: "",
                  required: false,
                  placeholder: "Enter Description",
                  action: "",
                  pipe: "",
                  searchcriteria:
                  {
                    formcontrolname: "devtype1descsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url: "DevType1/search",
                  method: "post",
                  data: null
                }
              ],
              api: [
                {
                  api: "assets/config/grid-data.json",
                  apidata: "",
                  url: "",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devtype2: [
            {
              fieldprop: [
                {
                  formcontrolname: "devtype2name",
                  label: "Dev Type2 / Class",
                  type: "text",
                  api: "",
                  required: "false",
                  placeholder: "Enter Dev Type2",
                  action: "",
                  pipe: "",
                  searchcriteria:
                  {
                    formcontrolname: "devtype2namesrccriteria"
                  }
                },
                {
                  formcontrolname: "devtype2desc",
                  label: "Description",
                  type: "textarea",
                  api: "",
                  required: false,
                  placeholder: "Enter Description",
                  action: "",
                  pipe: "",
                  searchcriteria:
                  {
                    formcontrolname: "devtype2descsrccriteria"
                  }
                },
                {
                  formcontrolname: "devtype2devtype1",
                  field: "devtype1",
                  label: "Dev Type 1",
                  type: "select",
                  fieldtype: "number",
                  api: "devtype1/ddl",
                  apidata: "",
                  required: "required",
                  placeholder: "Select Dev Type1",
                  action: "",
                  pipe: "",
                  bindname: "name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname: "devtype2devtype11ccriteria"
                  }
                },

              ],
              searchApi: [
                {
                  url: "DevType2/search",
                  method: "post",
                  data: null
                }
              ],
              api: [
                {
                  api: "assets/config/grid-data.json",
                  apidata: "",
                  url: "",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          channeltype: [
            {
              fieldprop: [
                {
                  formcontrolname:"channeltypename",
                  label:"Channel Type",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Channel Type",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channeltypenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"channeltypedesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channeltypedescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"channeltype/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          cabinets: [
            {
              fieldprop: [
                {
                  formcontrolname:"cabinetsname",
                  label:"Cabinets",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Cabinets",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"cabinetsnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"cabinetsdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"cabinetsdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"Cabinet/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          channel: [
            {
              fieldprop: [
                {
                  formcontrolname:"channelname",
                  field:"channel",
                  label:"Channel",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Channel",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channelsrccriteria"
                  }
                },
                {
                  formcontrolname:"channeldesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channeldescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"channel/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devefforttype: [
            {
              fieldprop: [
                {
                  formcontrolname:"devefforttypename",
                  label:"Dev Effort Type",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Dev Effort Type",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devefforttypenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"devefforttypedesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devefforttypedescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"devefforttype/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          status1: [
            {
              fieldprop: [
                {
                  formcontrolname:"status1name",
                  field:"status1",
                  label:"Status1",
                  type:"text",
                  api:"",
                  required:"null",
                  placeholder:"Enter Status1",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status1namesrccriteria"
                  }
                },
                {
                  formcontrolname:"status1desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status1descsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"status1/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          status2: [
            {
              fieldprop: [
                {
                  formcontrolname:"status2name",
                  field:"status2",
                  label:"Status2",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Status2",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status2namesrccriteria"
                  }
                },
                {
                  formcontrolname:"status2desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status2descsrccriteria"
                  }
                },{
                  formcontrolname:"status1",
                  label:"Status1",
                  field:"status1",
                  type:"select",
                  api:"Status1/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Status1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"status1srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"status2/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          status3: [
            {
              fieldprop: [
                {
                  formcontrolname:"status3name",
                  field:"status3",
                  label:"Status3",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Status3",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status3namesrccriteria"
                  }
                },
                {
                  formcontrolname:"status3desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status3descsrccriteria"
                  }
                },{
                  formcontrolname:"status2",
                  label:"Status2",
                  field:"status2",
                  type:"select",
                  api:"Status2/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Status2",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"status2srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"status3/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          prodcat1: [
            {
              fieldprop: [
                {
                  formcontrolname:"prodcat1name",
                  field:"prodcat1",
                  label:"Prodcat1",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Prodcat1",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat1namesrccriteria"
                  }
                },
                {
                  formcontrolname:"prodcat1desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat1descsrccriteria"
                  }
                }
              ],searchApi: [
                {
                  url:"prodcat1/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          prodcat2: [
            {
              fieldprop: [
                {
                  formcontrolname:"prodcat2name",
                  field:"prodcat2",
                  label:"Prodcat2",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Prodcat2",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat2namesrccriteria"
                  }
                },
                {
                  formcontrolname:"prodcat2desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat2descsrccriteria"
                  }
                },{
                  formcontrolname:"prodcat1",
                  label:"Prodcat1",
                  field:"prodcat1",
                  type:"select",
                  api:"Prodcat1/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Prodcat1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"prodcat1srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"prodcat2/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          prodcat3: [
            {
              fieldprop: [
                {
                  formcontrolname:"prodcat3name",
                  field:"prodcat3",
                  label:"Prodcat3",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Prodcat3",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat3namesrccriteria"
                  }
                },
                {
                  formcontrolname:"prodcat3desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat3descsrccriteria"
                  }
                },{
                  formcontrolname:"prodcat2",
                  label:"Prodcat2",
                  field:"prodcat2",
                  type:"select",
                  api:"prodcat2/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select prodcat2",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"prodcat2srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"prodcat3/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devcomplexity: [
            {
              fieldprop: [
                {
                  formcontrolname:"devcomplexityname",
                  label:"Dev Complexity",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Dev Complexity",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devcomplexitynamesrccriteria"
                  }
                },
                {
                  formcontrolname:"devcomplexitydesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devcomplexitydescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"devcomplexity/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          productbasket: [
            {
              fieldprop: [
                {
                  formcontrolname:"productbasketname",
                  label:"Product Basket",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Product Basket",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"productbasketnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"productbasketdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"productbasketdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"productbasket/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          productgroup: [
            {
              fieldprop: [
                {
                  formcontrolname:"productgroupname",
                  label:"Product Group",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Product Group",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"productgroupnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"productgroupdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"productgroupdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"productgroup/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          quarter: [
            {
              fieldprop: [
                {
                  formcontrolname:"quartername",
                  field:"quarter",
                  label:"Quarter",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Quarter",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"quarternamesrccriteria"
                  }
                },
                {
                  formcontrolname:"quarterdesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"quarterdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"quarter/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          gravity: [
            {
              fieldprop: [
                {
                  formcontrolname:"gravityname",
                  field:"Gravity",
                  label:"Gravity",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Gravity",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"gravitynamesrccriteria"
                  }
                },
                {
                  formcontrolname:"gravitydesc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"gravitydescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"gravity/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          pool: [
            {
              fieldprop: [
                {
                  formcontrolname:"poolname",
                  field:"pool",
                  label:"Pool",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Pool",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"poolnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"pooldesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"pooldescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"pool/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          gamecomplexity: [
            {
              fieldprop: [
                {
                  formcontrolname:"gamecomplexityname",
                  field:"gamecomplexity",
                  label:"Game Complexity",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Game Complexity",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"gamecomplexitynamesrccriteria"
                  }
                },
                {
                  formcontrolname:"gamecomplexitydesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"gamecomplexitydescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"gamecomplexity/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          financialyear: [
            {
              fieldprop: [
                {
                  formcontrolname:"financialyearname",
                  field:"financialyear",
                  label:"Financial Year",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Financial Year",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"financialyearnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"financialyeardesc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"financialyeardescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"financialyear/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          emulation: [
            {
              fieldprop: [
                {
                  formcontrolname:"emulationname",
                  field:"emulation",
                  label:"Emulation",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Emulation",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"emulationnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"emulationdesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"emulationdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"emulation/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          denom: [
            {
              fieldprop: [
                {
                  formcontrolname:"denomname",
                  field:"denom",
                  label:"Denom",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Denom",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"denomnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"denomdesc",
                  field:"descr_long",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"denomdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"denom/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          theme: [
            {
              fieldprop: [
                {
                  formcontrolname:"themename",
                  field:"theme",
                  label:"Theme",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Theme",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"themenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"themedesc",
                  field:"descr_long",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"themedescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"theme/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          title: [
            {
              fieldprop: [
                {
                  formcontrolname:"titlename",
                  field:"title",
                  label:"Title",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Title",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"titlenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"titledesc",
                  field:"descr_long",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"titledescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"title/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          risk: [
            {
              fieldprop: [
                {
                  formcontrolname:"riskname",
                  field:"risk",
                  label:"Risk",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Risk",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"risknamesrccriteria"
                  }
                },
                {
                  formcontrolname:"riskdesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"riskdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"risk/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          viridianlaunch: [
            {
              fieldprop: [
                {
                  formcontrolname:"viridianlaunchname",
                  field:"viridianlaunch",
                  label:"Viridianlaunch",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Viridianlaunch",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"viridianlaunchnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"viridianlaunchdesc",
                  field:"descr_long",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"viridianlaunchdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"viridianlaunch/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
	   vidstep: [
            {
              fieldprop: [
                {
                  formcontrolname:"vidstepname",
                  field:"vidstep",
                  label:"Video Stepper",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Video Stepper",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"vidstepnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"vidstepdesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"vidstepdescsrccriteria"
                  }
                },
                {
                  formcontrolname:"vidstepdesclong",
                  field:"descrLong",
                  label:"Description Long",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description Long",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"vidstepdesclongsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"vidstep/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          flag: [
            {
              fieldprop: [
                {
                //   formcontrolname: 'flag',
                // field: 'flag',
                // label: 'Flag',
                // type: 'select',
                // fieldtype: 'number',
                // api: 'flag/ddl',
                // apidata: '',
                // required: 'required',
                // placeholder: 'Select Flag',
                // action: '',
                // pipe: '',
                // bindname: 'description',
                // bindvalue: 'id',
                // clearable: false,
                // virtualScroll: true,
                // multiple: false,
                formcontrolname:"flag",
                  field:"flag",
                  label:"Flag",
                  type:"number",
                  api:"",
                  required:false,
                  placeholder:"Enter Flag",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"flagsrccriteria"
                  }
                },
                {
                  formcontrolname:"bucket",
                  field:"bucket",
                  label:"Bucket",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Bucket",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"bucketsrccriteria"
                  }
                },
                {
                  formcontrolname:"flagcomplexity",
                  field: 'complexity',
                  label: 'Complexity',
                  type: 'text',
                  api: 'gamecomplexity/ddl',                 
                  required: false,
                  placeholder: 'Enter Complexity',
                  action: '',
                  pipe: '',
                  searchcriteria:
                  {
                    formcontrolname:"flagcomplexitysrccriteria"
                  }
                },
                // {
                //   formcontrolname:"prodcat3",
                //   field: 'cat3Id',
                //   label: 'Cat 3',
                //   type: 'select',
                //   fieldtype: 'number',
                //   api: 'prodcat3/ddl',
                //   apidata: '',
                //   required: 'required',
                //   placeholder: 'Select Cat3',
                //   action: '',
                //   pipe: '',
                //   bindname: 'description',
                //   bindvalue: 'id',
                //   clearable: false,
                //   virtualScroll: true,
                //   multiple: false,
                //   searchcriteria:
                //   {
                //     formcontrolname:"fprodcat3srccriteria"
                //   }
                // },
                // {
                //   formcontrolname:"flagcat4Id",
                //   field: 'cat4Id',
                //   label: 'Cat 4',
                //   type: 'select',
                //   fieldtype: 'number',
                //   api: 'prodcat3/ddl',
                //   apidata: '',
                //   required: 'required',
                //   placeholder: 'Select Cat4',
                //   action: '',
                //   pipe: '',
                //   bindname: 'description',
                //   bindvalue: 'id',
                //   clearable: false,
                //   virtualScroll: true,
                //   multiple: false,
                //   searchcriteria:
                //   {
                //     formcontrolname:"flagcat4Idsrccriteria"
                //   }
                // },
              ],
              searchApi: [
                {
                  url:"flag/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          studio2: [
            {
              fieldprop: [
                {
                  formcontrolname:"studio2name",
                  field:"studio2",
                  label:"Studio2",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Studio2",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studio2namesrccriteria"
                  }
                },
                {
                  formcontrolname:"studio2desc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studio2descsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"studio2/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          studiotype: [
            {
              fieldprop: [
                {
                  formcontrolname:"studiotypename",
                  field:"studiotype",
                  label:"Studio Type",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Studio Type",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studiotypenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"studiotypedesc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studiotypedescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"studiotype/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ]
        }
      ],
      transaction: [
        {}
      ]
    }
  ]
