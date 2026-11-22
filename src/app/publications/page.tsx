'use client'

import { Color, FontVariant, Radius, ScreenSize, linearlyScaleSize } from '@/app/theme'
import { Divider } from '@/components/Divider'
import { Filter } from '@/components/Filter'
import { PublicationCard } from '@/components/Publication/PublicationCard'
import { Section, SectionContent, SectionTitle, Sections } from '@/components/Section'
import { Sidebar } from '@/components/SideBar'
import type { ResearchTopicType } from '@/data/publications'
import { PUBLICATIONS_BY_YEAR, Publication, PublicationTypes, ResearchTopics } from '@/data/publications'
import styled from '@emotion/styled'
import { startCase } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useRef } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px
    ${linearlyScaleSize({
      minSizePx: 24,
      maxSizePx: 96,
      minScreenSizePx: parseInt(ScreenSize.md),
      maxScreenSizePx: parseInt(ScreenSize.lg),
    })};
  padding-right: ${linearlyScaleSize({
    minSizePx: 24,
    maxSizePx: 8,
    minScreenSizePx: parseInt(ScreenSize.sm),
    maxScreenSizePx: parseInt(ScreenSize.md),
  })};
  width: 100%;
  gap: 16px;
  @media (min-width: ${ScreenSize.max}) {
    width: ${ScreenSize.max};
    margin: 0 auto;
  }

  & > main {
    // make the main content (publications list) take up 85% and the Sidebar component 15%
    width: 85%;

    @media (max-width: ${ScreenSize.sm}) {
      width: 100%;
    }
  }
`

const SideContainer = styled.div`
  padding-top: 96px;
  padding-left: 30px;
  padding-right: 30px;
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${ScreenSize.sm}) {
    display: none;
  }
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
`

const PreprintsToggle = styled('label', {
  shouldForwardProp: prop => prop !== 'checked',
})<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${props => (props.checked ? Color.blue900 : Color.gray300)};
  border-radius: ${Radius.md};
  padding: 6px 14px;
  cursor: pointer;
  ${FontVariant.body_md}
  color: ${props => (props.checked ? Color.blue900 : Color.gray700)};
  background-color: ${props => (props.checked ? Color.blue50 : Color.white)};
  white-space: nowrap;
  user-select: none;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    color: ${props => (props.checked ? Color.blue900 : Color.black)};
    border-color: ${props => (props.checked ? Color.blue900 : Color.gray500)};
  }

  &:focus-within {
    outline: 2px solid ${Color.blue700};
    outline-offset: 1px;
  }

  input {
    margin: 0;
    cursor: pointer;
    accent-color: ${Color.blue900};
  }
`

// Years act as small accent labels here, distinct from the People page's section headings
const YearTitle = styled(SectionTitle)`
  color: ${Color.blue900};
`

const preprintKey = 'Preprint'
const sortSections = (sections: string[]) => {
  return [...sections].sort((a, b) => b.localeCompare(a))
}

const parseListParam = (value: string | null) => (value ? value.split(',').filter(Boolean) : [])

export default function Page() {
  const router = useRouter()
  const params = useSearchParams()
  const researchTopicParam = params.get('researchTopic')
  const publicationTypeParam = params.get('publicationType')
  const preprintsParam = params.get('preprints')
  const researchTopics = useMemo(() => parseListParam(researchTopicParam), [researchTopicParam])
  const publicationTypes = useMemo(() => parseListParam(publicationTypeParam), [publicationTypeParam])
  const includePreprints =
    publicationTypes.length > 0 ? publicationTypes.includes(preprintKey) : preprintsParam !== 'false'
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const updateUrl = (topics: string[], types: string[], showPreprints: boolean) => {
    const query = new URLSearchParams()
    if (topics.length > 0) query.set('researchTopic', topics.join(','))
    if (types.length > 0) query.set('publicationType', types.join(','))
    if (types.length === 0 && !showPreprints) query.set('preprints', 'false')
    const qs = query.toString()
    router.push(qs ? `/publications/?${qs}` : '/publications/')
  }

  const handleResearchTopicsChange = (topics: string[]) => {
    updateUrl(topics, publicationTypes, includePreprints)
  }

  const handlePublicationTypesChange = (types: string[]) => {
    const nextShowPreprints = types.length > 0 ? types.includes(preprintKey) : true
    updateUrl(researchTopics, types, nextShowPreprints)
  }

  const handleTogglePreprints = () => {
    const nextShowPreprints = !includePreprints
    if (publicationTypes.length > 0) {
      const nextTypes = nextShowPreprints
        ? publicationTypes.includes(preprintKey)
          ? publicationTypes
          : [...publicationTypes, preprintKey]
        : publicationTypes.filter(t => t !== preprintKey)
      updateUrl(researchTopics, nextTypes, nextTypes.length > 0 ? nextShowPreprints : false)
    } else {
      updateUrl(researchTopics, [], nextShowPreprints)
    }
  }

  const publicationList = useMemo(() => {
    return Object.entries(PUBLICATIONS_BY_YEAR).reduce(
      (acc, [year, publications]) => {
        const filteredPublications = publications.filter(pub => {
          const matchesTopic = researchTopics.every(topic => pub.topics.includes(topic as ResearchTopicType))
          const matchesType =
            publicationTypes.length === 0
              ? pub.type !== preprintKey || includePreprints
              : publicationTypes.includes(pub.type)
          return matchesTopic && matchesType
        })
        if (filteredPublications.length > 0) {
          acc[year] = filteredPublications
        }
        return acc
      },
      {} as Record<string, Publication[]>
    )
  }, [researchTopics, publicationTypes, includePreprints])

  const sectionList = useMemo(() => sortSections(Object.keys(publicationList)), [publicationList])

  return (
    <Container>
      <main style={{ padding: '0px', margin: '0px' }}>
        <h1>Publications</h1>
        <Filters>
          <Filter
            filterName="Research Topic"
            optionSet={['All', ...Object.keys(ResearchTopics)]}
            optionsSelected={researchTopics}
            handleOptionsChange={handleResearchTopicsChange}
          />
          <Filter
            filterName="Publication Type"
            optionSet={['All', ...PublicationTypes]}
            optionsSelected={publicationTypes}
            handleOptionsChange={handlePublicationTypesChange}
          />
          <PreprintsToggle checked={includePreprints}>
            <input type="checkbox" checked={includePreprints} onChange={handleTogglePreprints} />
            Include Preprints
          </PreprintsToggle>
        </Filters>
        <Sections>
          {sectionList.map(sectionName => {
            return (
              publicationList[sectionName] &&
              publicationList[sectionName].length > 0 && (
                <React.Fragment key={sectionName}>
                  <Section
                    key={sectionName}
                    id={startCase(sectionName)}
                    ref={el => {
                      sectionRefs.current[sectionName] = el
                    }}
                  >
                    <YearTitle>{sectionName}</YearTitle>
                    <SectionContent>
                      {publicationList[sectionName].map((pub, index) => (
                        <PublicationCard key={pub.title} pub={pub} />
                      ))}
                    </SectionContent>
                  </Section>
                  <Divider />
                </React.Fragment>
              )
            )
          })}
        </Sections>
      </main>
      <SideContainer>
        <Sidebar sidebarList={sectionList} sectionRefs={sectionRefs} />
      </SideContainer>
    </Container>
  )
}
