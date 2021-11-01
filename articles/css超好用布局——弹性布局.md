

pushRoute(orgId){
  const orgLevel = this.orgs.find(org => org.orgId === orgId).bak2;
  let name = this.$route.name;

  if(orgLevel === ORG_LEVEL_1){
    name = name.split('Drill')[0];
  }
  if(orgLevel === ORG_LEVEL_2 && name.indexOf('Drill') === -1){
    name += 'Drill';
  }

  this.$router.push({name, params:{orgId}});
}