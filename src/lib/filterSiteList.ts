export const filterSiteListData = ({
  form,
  originalData,
}: {
  form: any;
  originalData: any[];
  HousingType?: string;
}) => {
  const values = form.getValues();
  console.log("Filtering with Site:", values.site);

  return originalData.filter((item) => {
    console.log("Item Site:", item.Site);

    const siteMatch = values.site
      ? item.Site && item.Site.toLowerCase().includes(values.site.toLowerCase())
      : true;

    return siteMatch;
  });
};
