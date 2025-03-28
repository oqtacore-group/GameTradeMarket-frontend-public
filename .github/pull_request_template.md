[//]: # ([Link to Jira Issue.]&#40;https://blogademy.atlassian.net/browse/BLGDV-xxx&#41;)

[//]: # (## Changes)

[//]: # ()
[//]: # (Within this PR, the following was done:)

[//]: # ()
[//]: # (- ...)


## Completed Task Numbers within the Pull Request (PR)

List the Jira task numbers and briefly describe what was done

- ...

## Review Request Checklist

Before requesting a Review, I did:


#### General Requirements List

- [ ] Removed all `console.log`
- [ ] Before creating the PR, ran `yarn` and checked the build locally again
- [ ] If packages were installed in `package.json` as part of this PR - removed unnecessary ones
- [ ] **MANDATORY**. Merged the `develop` branch into my working branch

#### Choose one:
- [ ] If the task was implemented on both **backend** and **frontend**:
  - Checked local variables in `.env.local`
  - Ran **local** build `build:local:app` or `build:local:admin` and it compiled successfully
  - Checked the written backend migrations
  - First deployed the **backend** and then the **frontend**
- [ ] If the task was only on the **frontend**:
  - Ran the build for **qa** or **prod** Amazon environment using `build` or `build:admin`
  - Checked local variables in `.env.dev` `.env.prod`

[//]: # (- [ ] Made 'git rebase -i develop')
[//]: # (- [ ] Removed all unnecessary commits)
[//]: # (- [ ] My code complies with agreements between Frontend and Backend)
[//]: # (- [ ] Described the list of changes above in 'Changes')
[//]: # (- [ ] Moved the task in Jira to the 'In Review' column)
[//]: # (- [ ] Assigned a Reviewer to the PR)
[//]: # (- [ ] In the 'Assignees' field, specified all frontend developers &#40;including myself&#41;)


[//]: # (## Reviewer Checklist)

[//]: # ()
[//]: # (- [ ] I reviewed the code)

[//]: # (- [ ] I ran the code locally)

[//]: # (- [ ] I checked for compliance with the requirements)

[//]: # (### Successful Review)

[//]: # ()
[//]: # (- [ ] I moved the task in Jira to the 'TESTING' column &#40;QA&#41;)

[//]: # (- [ ] Deleted the branch after merging)


[//]: # (### Failed Review)

[//]: # ()
[//]: # (- [ ] I moved the task in Jira to the 'To Do' column)

[//]: # (- [ ] I described what needs to be changed &#40;here or in Jira&#41;)
